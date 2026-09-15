package com.example.calistovault.data.repository

import com.example.calistovault.data.AppDatabase
import com.example.calistovault.data.dao.DataDao
import com.example.calistovault.data.entity.DataEntity
import com.example.calistovault.network.ApiService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class DataRepository(
    private val database: AppDatabase,
    private val apiService: ApiService
) {
    
    private val dataDao: DataDao = database.dataDao()
    
    suspend fun getAllData(): List<DataEntity> = withContext(Dispatchers.IO) {
        dataDao.getAll()
    }
    
    suspend fun insertData(key: String, value: String): DataEntity = withContext(Dispatchers.IO) {
        val entity = DataEntity(key = key, value = value, synced = false)
        dataDao.insert(entity)
        entity
    }
    
    suspend fun syncData(): Boolean = withContext(Dispatchers.IO) {
        try {
            val unsynced = dataDao.getUnsynced()
            if (unsynced.isEmpty()) return@withContext true
            
            // Send to Cloudflare Workers API
            val response = apiService.syncData(unsynced.map {
                mapOf("key" to it.key, "value" to it.value)
            })
            
            if (response.success) {
                unsynced.forEach { dataDao.markAsSynced(it.id) }
                return@withContext true
            }
            return@withContext false
        } catch (e: Exception) {
            false
        }
    }
    
    suspend fun fetchFromCloudflare(): List<DataEntity> = withContext(Dispatchers.IO) {
        try {
            val response = apiService.getData()
            if (response.success && response.data != null) {
                response.data.map {
                    DataEntity(
                        key = it["key"] as? String ?: "",
                        value = it["value"] as? String ?: "",
                        synced = true
                    )
                }.also { remoteData ->
                    // Insert or update local data
                    remoteData.forEach { entity ->
                        dataDao.insert(entity)
                    }
                }
            }
            dataDao.getAll()
        } catch (e: Exception) {
            dataDao.getAll()
        }
    }
}
