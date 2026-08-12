package com.calisto.vault.db

import net.sqlcipher.database.SQLiteDatabase
import net.sqlcipher.database.SQLiteOpenHelper
import android.content.Context

class VaultDB(context: Context) : SQLiteOpenHelper(context, "vault.db", null, 1) {
    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL("""
            CREATE TABLE IF NOT EXISTS entries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                username TEXT,
                password TEXT,
                notes TEXT,
                created_at TEXT
            )
        """)
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {}

    fun open(): SQLiteDatabase {
        SQLiteDatabase.loadLibs(context)
        return getWritableDatabase("calisto_master_key")
    }
}
