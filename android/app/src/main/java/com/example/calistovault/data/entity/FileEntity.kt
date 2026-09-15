package com.example.calistovault.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * Encja do przechowywania informacji o plikach
 * Pliki fizyczne są w Cloudflare R2, tutaj tylko metadane
 */
@Entity(tableName = "files")
data class FileEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val fileName: String,           // Oryginalna nazwa pliku
    val r2Key: String,              // Klucz w R2 Storage
    val fileUrl: String,            // Publiczny URL z CDN
    val fileType: String,           // MIME type (image/jpeg, video/mp4, etc.)
    val fileSize: Long,             // Rozmiar w bajtach
    val userId: String,             // ID użytkownika
    val uploadTime: Long = System.currentTimeMillis(),
    val synced: Boolean = false
)
