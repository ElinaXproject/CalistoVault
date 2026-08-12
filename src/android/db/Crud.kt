package com.calisto.vault.db

import net.sqlcipher.database.SQLiteDatabase

data class Entry(
    val id: Long,
    val title: String,
    val username: String,
    val password: String,
    val notes: String,
    val createdAt: String
)

class Crud(private val db: SQLiteDatabase) {

    fun getAll(): List<Entry> {
        val list = mutableListOf<Entry>()
        val cursor = db.rawQuery("SELECT * FROM entries ORDER BY id DESC", null)
        if (cursor.moveToFirst()) {
            do {
                list.add(
                    Entry(
                        id = cursor.getLong(cursor.getColumnIndexOrThrow("id")),
                        title = cursor.getString(cursor.getColumnIndexOrThrow("title")),
                        username = cursor.getString(cursor.getColumnIndexOrThrow("username")),
                        password = cursor.getString(cursor.getColumnIndexOrThrow("password")),
                        notes = cursor.getString(cursor.getColumnIndexOrThrow("notes")),
                        createdAt = cursor.getString(cursor.getColumnIndexOrThrow("created_at"))
                    )
                )
            } while (cursor.moveToNext())
        }
        cursor.close()
        return list
    }

    fun add(entry: Entry) {
        db.execSQL(
            "INSERT INTO entries (title, username, password, notes, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
            arrayOf(entry.title, entry.username, entry.password, entry.notes)
        )
    }

    fun delete(id: Long) {
        db.execSQL("DELETE FROM entries WHERE id = ?", arrayOf(id))
    }
}
