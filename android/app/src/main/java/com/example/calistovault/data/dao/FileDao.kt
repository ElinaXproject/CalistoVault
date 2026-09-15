package com.example.calistovault.data.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.calistovault.data.entity.FileEntity

/**
 * DAO dla operacji na plikach
 */
@Dao
interface FileDao {
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(file: FileEntity): Long
    
    @Query("SELECT * FROM files WHERE userId = :userId ORDER BY uploadTime DESC")
    suspend fun getFilesByUser(userId: String): List<FileEntity>
    
    @Query("SELECT * FROM files WHERE id = :id")
    suspend fun getFileById(id: Int): FileEntity?
    
    @Query("SELECT * FROM files WHERE r2Key = :r2Key")
    suspend fun getFileByR2Key(r2Key: String): FileEntity?
    
    @Query("SELECT * FROM files WHERE synced = 0")
    suspend fun getUnsyncedFiles(): List<FileEntity>
    
    @Query("UPDATE files SET synced = 1 WHERE id = :id")
    suspend fun markAsSynced(id: Int)
    
    @Query("DELETE FROM files WHERE id = :id")
    suspend fun delete(id: Int)
    
    @Query("DELETE FROM files WHERE userId = :userId")
    suspend fun deleteAllByUser(userId: String)
    
    @Query("SELECT COUNT(*) FROM files WHERE userId = :userId")
    suspend fun getFileCount(userId: String): Int
    
    @Query("SELECT SUM(fileSize) FROM files WHERE userId = :userId")
    suspend fun getTotalFileSize(userId: String): Long
}
