package com.calisto.vault

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.calisto.vault.db.VaultDB

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        VaultDB(this).open()
    }
}

