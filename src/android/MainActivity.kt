package com.calisto.vault

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import java.io.InputStream
import org.json.JSONObject

class MainActivity : AppCompatActivity() {

    private fun loadVersion(): JSONObject? {
        return try {
            val inputStream: InputStream = assets.open("version.json")
            val jsonString = inputStream.bufferedReader().use { it.readText() }
            JSONObject(jsonString)
        } catch (e: Exception) {
            null
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val version = loadVersion()
        println("Calisto Vault — Android wersja: ${version?.getString("version") ?: "unknown"}")

        setContentView(R.layout.activity_main)
    }
}
