package com.example.calistovault.ui

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.calistovault.data.repository.DataRepository
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CalistoVaultApp(repository: DataRepository) {
    
    val scope = rememberCoroutineScope()
    var dataList by remember { mutableStateOf(listOf<Pair<String, String>>()) }
    var key by remember { mutableStateOf("") }
    var value by remember { mutableStateOf("") }
    var isLoading by remember { mutableStateOf(false) }
    
    // Load data on startup
    scope.launch {
        isLoading = true
        dataList = repository.getAllData().map { it.key to it.value }
        isLoading = false
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("Calisto Vault")
        
        TextField(
            value = key,
            onValueChange = { key = it },
            label = { Text("Key") },
            modifier = Modifier.padding(vertical = 8.dp)
        )
        
        TextField(
            value = value,
            onValueChange = { value = it },
            label = { Text("Value") },
            modifier = Modifier.padding(vertical = 8.dp)
        )
        
        Button(
            onClick = {
                scope.launch {
                    if (key.isNotBlank() && value.isNotBlank()) {
                        repository.insertData(key, value)
                        dataList = repository.getAllData().map { it.key to it.value }
                        key = ""
                        value = ""
                    }
                }
            },
            modifier = Modifier.padding(vertical = 8.dp)
        ) {
            Text("Save Data")
        }
        
        Button(
            onClick = {
                scope.launch {
                    isLoading = true
                    val synced = repository.syncData()
                    if (synced) {
                        dataList = repository.fetchFromCloudflare().map { it.key to it.value }
                    }
                    isLoading = false
                }
            },
            modifier = Modifier.padding(vertical = 8.dp)
        ) {
            Text(if (isLoading) "Syncing..." else "Sync with Cloudflare")
        }
        
        Text("Stored Data:")
        dataList.forEach { (k, v) ->
            Text("$k: $v")
        }
    }
}
