package com.example.calistovault.network

import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Response
import retrofit2.http.*

/**
 * Interfejs API dla Cloudflare Workers
 * 
 * Endpointy:
 * - /api/data - Operacje na danych (KV Storage)
 * - /api/files - Operacje na plikach (R2 Storage)
 * - /api/ai - Funkcje AI (Mistral, Hugging Face, Replicate)
 * - /api/auth - Autentykacja
 */

// ========== RESPONSE CLASSES ==========

data class ApiResponse<T>(
    val success: Boolean,
    val data: T? = null,
    val message: String? = null,
    val error: String? = null
)

data class FileUploadResponse(
    val fileName: String,
    val originalName: String,
    val url: String,
    val size: Long,
    val type: String
)

data class FileListResponse(
    val files: List<FileInfo>,
    val count: Int,
    val hasMore: Boolean
)

data class FileInfo(
    val name: String,
    val size: Long,
    val uploaded: String,
    val url: String
)

data class AITextResponse(
    val text: String,
    val model: String,
    val usage: Map<String, Any>? = null
)

data class AISentimentResponse(
    val sentiment: String,
    val score: Double,
    val confidence: Double
)

data class AIImageResponse(
    val imageUrl: String,
    val predictionId: String
)

data class AuthResponse(
    val authenticated: Boolean,
    val token: String? = null,
    val userId: String? = null,
    val registered: Boolean = false
)

data class StatsResponse(
    val kvStorage: Map<String, Any>,
    val r2Storage: Map<String, Any>,
    val workers: Map<String, Any>,
    val timestamp: Long
)

// ========== API INTERFACE ==========

interface ApiService {
    
    // ========== DATA API (KV Storage) ==========
    
    @GET("/api/data")
    suspend fun getData(): ApiResponse<List<Map<String, Any>>>
    
    @POST("/api/data")
    suspend fun saveData(@Body request: Map<String, Any>): ApiResponse<Map<String, Any>>
    
    @HTTP(method = "DELETE", path = "/api/data", hasBody = true)
    suspend fun deleteData(@Body request: Map<String, List<String>>): ApiResponse<Map<String, Any>>
    
    // ========== FILES API (R2 Storage) ==========
    
    @Multipart
    @POST("/api/files/upload")
    suspend fun uploadFile(
        @Part file: MultipartBody.Part,
        @Part("userId") userId: RequestBody,
        @Part("fileName") fileName: RequestBody
    ): ApiResponse<FileUploadResponse>
    
    @GET("/api/files/download")
    suspend fun downloadFile(@Query("fileName") fileName: String): Response<okhttp3.ResponseBody>
    
    @HTTP(method = "DELETE", path = "/api/files/delete", hasBody = true)
    suspend fun deleteFile(@Body request: Map<String, String>): ApiResponse<Map<String, Any>>
    
    @GET("/api/files/list")
    suspend fun listFiles(
        @Query("prefix") prefix: String = "",
        @Query("limit") limit: Int = 50
    ): ApiResponse<FileListResponse>
    
    @GET("/api/files/exists")
    suspend fun checkFileExists(@Query("fileName") fileName: String): ApiResponse<Map<String, Any>>
    
    // ========== AI API ==========
    
    @POST("/api/ai/generate")
    suspend fun generateText(@Body request: Map<String, Any>): ApiResponse<AITextResponse>
    
    @POST("/api/ai/analyze")
    suspend fun analyzeText(@Body request: Map<String, Any>): ApiResponse<Map<String, Any>>
    
    @POST("/api/ai/image")
    suspend fun generateImage(@Body request: Map<String, String>): ApiResponse<AIImageResponse>
    
    @POST("/api/ai/translate")
    suspend fun translateText(@Body request: Map<String, String>): ApiResponse<AITextResponse>
    
    @POST("/api/ai/summarize")
    suspend fun summarizeText(@Body request: Map<String, String>): ApiResponse<AITextResponse>
    
    @POST("/api/ai/sentiment")
    suspend fun analyzeSentiment(@Body request: Map<String, String>): ApiResponse<AISentimentResponse>
    
    // ========== AUTH API ==========
    
    @POST("/api/auth")
    suspend fun authenticate(@Body request: Map<String, String>): ApiResponse<AuthResponse>
    
    @GET("/api/auth/validate")
    suspend fun validateToken(@Query("token") token: String): ApiResponse<Map<String, Any>>
    
    // ========== SYSTEM API ==========
    
    @GET("/api/ping")
    suspend fun ping(): ApiResponse<Map<String, Any>>
    
    @GET("/api/stats")
    suspend fun getStats(): ApiResponse<StatsResponse>
}
