package com.example.calistovault

import android.app.Application
import com.example.calistovault.data.AppDatabase
import com.example.calistovault.data.repository.DataRepository
import com.example.calistovault.network.ApiService
import com.example.calistovault.network.RetrofitClient

class CalistoVaultApp : Application() {
    
    val database: AppDatabase by lazy { AppDatabase.getDatabase(this) }
    val apiService: ApiService by lazy { RetrofitClient.create() }
    val repository: DataRepository by lazy { DataRepository(database, apiService) }
    
    override fun onCreate() {
        super.onCreate()
        // Initialize app components
    }
}
