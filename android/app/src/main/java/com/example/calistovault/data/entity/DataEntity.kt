package com.example.calistovault.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "data")
data class DataEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val key: String,
    val value: String,
    val timestamp: Long = System.currentTimeMillis(),
    val synced: Boolean = false
)
