package com.example.calistovault.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.example.calistovault.data.dao.DataDao
import com.example.calistovault.data.dao.FileDao
import com.example.calistovault.data.entity.DataEntity
import com.example.calistovault.data.entity.FileEntity

/**
 * Baza danych Room dla Calisto Vault
 * Przechowuje dane lokalnie (offline-first)
 */
@Database(
    entities = [DataEntity::class, FileEntity::class],
    version = 2,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {
    
    abstract fun dataDao(): DataDao
    abstract fun fileDao(): FileDao
    
    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null
        
        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "calisto_vault_db"
                )
                    .fallbackToDestructiveMigration()
                    .build()
                INSTANCE = instance
                instance
            }
        }
    }
}
