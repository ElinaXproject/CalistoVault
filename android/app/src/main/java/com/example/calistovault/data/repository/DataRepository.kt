package com.example.calistovault.data.repository

import com.example.calistovault.data.AppDatabase
import com.example.calistovault.data.dao.DataDao
import com.example.calistovault.data.entity.DataEntity
import com.example.calistovault.network.ApiResponse
import com.example.calistovault.network.ApiService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

/**
 * Repozytorium do zarządzania danymi (hasłami, notatkami, etc.)
 * 
 * Funkcje:
 * - Operacje CRUD na lokalnej bazie danych (Room)
 * - Synchronizacja z Cloudflare KV Storage
 * - Offline-first podejście
 */
class DataRepository(
    private val database: AppDatabase,
    private val apiService: ApiService
) {
    
    private val dataDao: DataDao = database.dataDao()
    
    // ========== LOCAL OPERATIONS ==========
    
    suspend fun getAllData(): List<DataEntity> = withContext(Dispatchers.IO) {
        dataDao.getAll()
    }
    
    suspend fun insertData(key: String, value: String): DataEntity = withContext(Dispatchers.IO) {
        val entity = DataEntity(key = key, value = value, synced = false)
        dataDao.insert(entity)
        entity
    }
    
    suspend fun updateData(id: Int, key: String, value: String): Boolean = withContext(Dispatchers.IO) {
        try {
            val entity = DataEntity(id = id, key = key, value = value, synced = false)
            dataDao.insert(entity)
            true
        } catch (e: Exception) {
            false
        }
    }
    
    suspend fun deleteData(id: Int): Boolean = withContext(Dispatchers.IO) {
        try {
            dataDao.delete(id)
            true
        } catch (e: Exception) {
            false
        }
    }
    
    suspend fun getDataByKey(key: String): DataEntity? = withContext(Dispatchers.IO) {
        dataDao.getByKey(key)
    }
    
    // ========== SYNC OPERATIONS ==========
    
    /**
     * Synchronizuj dane z Cloudflare KV Storage
     */
    suspend fun syncData(): Boolean = withContext(Dispatchers.IO) {
        try {
            // Pobierz niesynchronizowane dane lokalne
            val unsynced = dataDao.getUnsynced()
            
            if (unsynced.isNotEmpty()) {
                // Wyślij do Cloudflare
                val response = apiService.saveData(
                    mapOf("data" to unsynced.map {
                        mapOf("key" to it.key, "value" to it.value)
                    })
                )
                
                if (response.success) {
                    // Oznacz jako zsynchronizowane
                    unsynced.forEach { dataDao.markAsSynced(it.id) }
                }
            }
            
            // Pobierz dane z Cloudflare
            val remoteResponse = apiService.getData()
            
            if (remoteResponse.success && remoteResponse.data != null) {
                remoteResponse.data.forEach { item ->
                    val key = item["key"] as? String ?: return@forEach
                    val value = item["value"] as? String ?: return@forEach
                    
                    // Sprawdź czy istnieje lokalnie
                    val existing = dataDao.getByKey(key)
                    
                    if (existing == null) {
                        // Nowy wpis z Cloudflare
                        dataDao.insert(DataEntity(key = key, value = value, synced = true))
                    } else if (!existing.synced) {
                        // Zaktualizuj lokalny wpis
                        dataDao.insert(DataEntity(
                            id = existing.id,
                            key = key,
                            value = value,
                            synced = true
                        ))
                    }
                }
            }
            
            true
            
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }
    
    /**
     * Pobierz dane z Cloudflare (pomijając lokalną bazę)
     */
    suspend fun fetchFromCloudflare(): List<DataEntity> = withContext(Dispatchers.IO) {
        try {
            val response = apiService.getData()
            
            if (response.success && response.data != null) {
                response.data.map { item ->
                    DataEntity(
                        key = item["key"] as? String ?: "",
                        value = item["value"] as? String ?: "",
                        synced = true
                    )
                }.also { remoteData ->
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
    
    // ========== SEARCH ==========
    
    suspend fun searchData(query: String): List<DataEntity> = withContext(Dispatchers.IO) {
        dataDao.getAll().filter {
            it.key.contains(query, ignoreCase = true) ||
            it.value.contains(query, ignoreCase = true)
        }
    }
    
    // ========== BATCH OPERATIONS ==========
    
    suspend fun insertBatch(items: List<Pair<String, String>>): Int = withContext(Dispatchers.IO) {
        items.count { (key, value) ->
            try {
                dataDao.insert(DataEntity(key = key, value = value, synced = false))
                true
            } catch (e: Exception) {
                false
            }
        }
    }
    
    suspend fun deleteAll(): Boolean = withContext(Dispatchers.IO) {
        try {
            val all = dataDao.getAll()
            all.forEach { dataDao.delete(it.id) }
            true
        } catch (e: Exception) {
            false
        }
    }
    
    // ========== STATS ==========
    
    suspend fun getStats(): Map<String, Any> = withContext(Dispatchers.IO) {
        val all = dataDao.getAll()
        val synced = all.count { it.synced }
        val unsynced = all.size - synced
        
        mapOf(
            "total" to all.size,
            "synced" to synced,
            "unsynced" to unsynced,
            "lastSync" to System.currentTimeMillis()
        )
    }
}
