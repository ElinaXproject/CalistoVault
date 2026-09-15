package com.example.calistovault.data.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.calistovault.data.entity.DataEntity

@Dao
interface DataDao {
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(data: DataEntity)
    
    @Query("SELECT * FROM data ORDER BY timestamp DESC")
    suspend fun getAll(): List<DataEntity>
    
    @Query("SELECT * FROM data WHERE synced = 0")
    suspend fun getUnsynced(): List<DataEntity>
    
    @Query("UPDATE data SET synced = 1 WHERE id = :id")
    suspend fun markAsSynced(id: Int)
    
    @Query("DELETE FROM data WHERE id = :id")
    suspend fun delete(id: Int)
    
    @Query("SELECT * FROM data WHERE key = :key LIMIT 1")
    suspend fun getByKey(key: String): DataEntity?
}
