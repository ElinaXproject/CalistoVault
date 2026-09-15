package com.example.calistovault.network

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

/**
 * Klient Retrofit do połączenia z Cloudflare Workers API
 * 
 * Konfiguracja:
 * - Base URL: Ustaw w CONST.BASE_URL
 * - Timeout: 30 sekund
 * - Logging: Włączony w debug
 */
object RetrofitClient {
    
    private const val BASE_URL = "https://YOUR_WORKER_URL.workers.dev/"
    
    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }
    
    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(loggingInterceptor)
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .build()
    
    fun create(): ApiService {
        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        return retrofit.create(ApiService::class.java)
    }
    
    /**
     * Aktualizuj BASE_URL (używane w testach lub dynamicznej konfiguracji)
     */
    fun setBaseUrl(url: String) {
        // W praktyce: tworzymy nowy klient z nowym URL
        // Dla uproszczenia: uzywamy stałego URL
    }
}
