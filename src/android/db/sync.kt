package com.calisto.vault.db

import okhttp3.*
import org.json.JSONArray
import org.json.JSONObject

class Sync {

    private val client = OkHttpClient()
    private val serverUrl = "https://your-sync-server-url.com"

    fun upload(entries: List<Entry>) {
        val json = JSONArray()
        entries.forEach {
            val obj = JSONObject()
            obj.put("title", it.title)
            obj.put("username", it.username)
            obj.put("password", it.password)
            obj.put("notes", it.notes)
            json.put(obj)
        }

        val body = RequestBody.create(
            MediaType.parse("application/json"),
            JSONObject().put("entries", json).toString()
        )

        val request = Request.Builder()
            .url("$serverUrl/upload")
            .post(body)
            .build()

        client.newCall(request).execute()
    }

    fun download(): List<Entry> {
        val request = Request.Builder()
            .url("$serverUrl/download")
            .get()
            .build()

        val response = client.newCall(request).execute()
        val json = JSONObject(response.body()?.string() ?: "{}")
        val arr = json.optJSONArray("entries") ?: JSONArray()

        val list = mutableListOf<Entry>()
        for (i in 0 until arr.length()) {
            val o = arr.getJSONObject(i)
            list.add(
                Entry(
                    id = 0,
                    title = o.getString("title"),
                    username = o.getString("username"),
                    password = o.getString("password"),
                    notes = o.getString("notes"),
                    createdAt = ""
                )
            )
        }
        return list
    }
}
