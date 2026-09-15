package com.example.calistovault.data.repository

import android.content.Context
import android.net.Uri
import com.example.calistovault.data.AppDatabase
import com.example.calistovault.data.dao.FileDao
import com.example.calistovault.data.entity.FileEntity
import com.example.calistovault.network.ApiService
import com.example.calistovault.network.FileUploadResponse
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import java.io.File
import java.io.FileOutputStream

/**
 * Repozytorium do zarządzania plikami
 * 
 * Funkcje:
 * - Upload plików do Cloudflare R2
 * - Pobieranie plików z R2
 * - Synchronizacja z serwerem
 * - Zarządzanie lokalną bazą danych
 */
class FileRepository(
    private val database: AppDatabase,
    private val apiService: ApiService,
    private val context: Context
) {
    
    private val fileDao: FileDao = database.fileDao()
    
    // ========== UPLOAD ==========
    
    /**
     * Upload pliku do Cloudflare R2
     * @param uri - URI pliku (z galeri lub kamery)
     * @param userId - ID użytkownika
     * @param fileName - Oryginalna nazwa pliku
     * @return FileEntity z informacjami o pliku
     */
    suspend fun uploadFile(uri: Uri, userId: String, fileName: String): FileEntity? {
        return try {
            // Pobierz tymczasowy plik z URI
            val tempFile = createTempFileFromUri(uri, context) ?: return null
            
            // Przygotuj MultipartBody.Part
            val requestFile = tempFile.asRequestBody(
                context.contentResolver.getType(uri)?.toMediaTypeOrNull() 
                    ?: "application/octet-stream".toMediaTypeOrNull()
            )
            
            val filePart = MultipartBody.Part.createFormData(
                "file",
                fileName,
                requestFile
            )
            
            // Upload do R2
            val response = apiService.uploadFile(
                file = filePart,
                userId = userId.toRequestBody("text/plain".toMediaTypeOrNull()),
                fileName = fileName.toRequestBody("text/plain".toMediaTypeOrNull())
            )
            
            if (response.success && response.data != null) {
                val uploadResponse = response.data
                
                // Zapisz metadane do lokalnej bazy
                val fileEntity = FileEntity(
                    fileName = fileName,
                    r2Key = uploadResponse.fileName,
                    fileUrl = uploadResponse.url,
                    fileType = uploadResponse.type,
                    fileSize = uploadResponse.size,
                    userId = userId,
                    synced = true
                )
                
                val id = fileDao.insert(fileEntity)
                fileEntity.copy(id = id.toInt())
            } else {
                null
            }
            
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
    
    /**
     * Upload pliku z byte array
     */
    suspend fun uploadFile(
        bytes: ByteArray,
        userId: String,
        fileName: String,
        mimeType: String = "application/octet-stream"
    ): FileEntity? {
        return try {
            val requestFile = bytes.toRequestBody(mimeType.toMediaTypeOrNull())
            val filePart = MultipartBody.Part.createFormData("file", fileName, requestFile)
            
            val response = apiService.uploadFile(
                file = filePart,
                userId = userId.toRequestBody("text/plain".toMediaTypeOrNull()),
                fileName = fileName.toRequestBody("text/plain".toMediaTypeOrNull())
            )
            
            if (response.success && response.data != null) {
                val uploadResponse = response.data
                
                val fileEntity = FileEntity(
                    fileName = fileName,
                    r2Key = uploadResponse.fileName,
                    fileUrl = uploadResponse.url,
                    fileType = uploadResponse.type,
                    fileSize = uploadResponse.size,
                    userId = userId,
                    synced = true
                )
                
                val id = fileDao.insert(fileEntity)
                fileEntity.copy(id = id.toInt())
            } else {
                null
            }
            
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
    
    // ========== DOWNLOAD ==========
    
    /**
     * Pobierz plik z R2
     * @param fileEntity - Encja pliku
     * @return Uri do pobranego pliku
     */
    suspend fun downloadFile(fileEntity: FileEntity): Uri? {
        return try {
            val response = apiService.downloadFile(fileEntity.r2Key)
            
            if (response.isSuccessful && response.body() != null) {
                // Zapisz do tymczasowego pliku
                val tempFile = File.createTempFile("calisto_", ".tmp", context.cacheDir)
                response.body()?.byteStream()?.use { input ->
                    FileOutputStream(tempFile).use { output ->
                        input.copyTo(output)
                    }
                }
                Uri.fromFile(tempFile)
            } else {
                null
            }
            
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
    
    // ========== LIST ==========
    
    /**
     * Pobierz listę plików użytkownika
     */
    suspend fun getFilesByUser(userId: String): List<FileEntity> {
        return fileDao.getFilesByUser(userId)
    }
    
    /**
     * Pobierz wszystkie niesynchronizowane pliki
     */
    suspend fun getUnsyncedFiles(): List<FileEntity> {
        return fileDao.getUnsyncedFiles()
    }
    
    // ========== DELETE ==========
    
    /**
     * Usuń plik z R2 i lokalnej bazy
     */
    suspend fun deleteFile(fileEntity: FileEntity): Boolean {
        return try {
            // Usuń z R2
            val response = apiService.deleteFile(mapOf("fileName" to fileEntity.r2Key))
            
            // Usuń z lokalnej bazy
            fileDao.delete(fileEntity.id)
            
            response.success
            
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }
    
    // ========== SYNC ==========
    
    /**
     * Synchronizuj lokalne pliki z R2
     */
    suspend fun syncFiles(userId: String): Boolean {
        return try {
            // Pobierz listę plików z R2
            val response = apiService.listFiles(prefix = userId)
            
            if (response.success && response.data != null) {
                val remoteFiles = response.data.files
                
                // Synchronizuj lokalne pliki
                remoteFiles.forEach { fileInfo ->
                    val existing = fileDao.getFileByR2Key(fileInfo.name)
                    
                    if (existing == null) {
                        // Nowy plik z R2 - dodaj lokalnie
                        val fileEntity = FileEntity(
                            fileName = fileInfo.name.split("/").last(),
                            r2Key = fileInfo.name,
                            fileUrl = fileInfo.url,
                            fileType = "",
                            fileSize = fileInfo.size,
                            userId = userId,
                            synced = true
                        )
                        fileDao.insert(fileEntity)
                    }
                }
                
                // Oznacz lokalne pliki jako zsynchronizowane
                val localFiles = fileDao.getFilesByUser(userId)
                localFiles.forEach { file ->
                    fileDao.markAsSynced(file.id)
                }
                
                true
            } else {
                false
            }
            
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }
    
    // ========== STATS ==========
    
    /**
     * Pobierz statystyki plików użytkownika
     */
    suspend fun getFileStats(userId: String): Map<String, Any> {
        return try {
            val count = fileDao.getFileCount(userId)
            val totalSize = fileDao.getTotalFileSize(userId)
            
            mapOf(
                "count" to count,
                "totalSize" to totalSize,
                "totalSizeMB" to totalSize / (1024 * 1024),
                "maxStorageMB" to 10240 // 10GB w MB
            )
            
        } catch (e: Exception) {
            e.printStackTrace()
            mapOf("error" to e.message)
        }
    }
    
    // ========== HELPERS ==========
    
    /**
     * Tworzy tymczasowy plik z URI
     */
    private fun createTempFileFromUri(uri: Uri, context: Context): File? {
        return try {
            val inputStream = context.contentResolver.openInputStream(uri) ?: return null
            val tempFile = File.createTempFile("calisto_temp_", ".tmp", context.cacheDir)
            
            inputStream.use { input ->
                FileOutputStream(tempFile).use { output ->
                    input.copyTo(output)
                }
            }
            
            tempFile
            
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}
