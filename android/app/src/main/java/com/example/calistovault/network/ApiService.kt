package com.example.calistovault.network

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

// Cloudflare Workers API endpoints
data class ApiResponse(
    val success: Boolean,
    val data: List<Map<String, Any>>? = null,
    val message: String? = null
)

interface ApiService {
    
    @GET("/api/data")
    suspend fun getData(): ApiResponse
    
    @POST("/api/data")
    suspend fun syncData(@Body data: List<Map<String, Any>>): ApiResponse
    
    @POST("/api/auth")
    suspend fun authenticate(@Body credentials: Map<String, String>): ApiResponse
}
