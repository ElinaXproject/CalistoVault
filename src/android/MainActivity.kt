package com.calisto.vault

import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.calisto.vault.db.VaultDB
import com.calisto.vault.db.Crud
import com.calisto.vault.db.Entry

class MainActivity : AppCompatActivity() {

    private lateinit var crud: Crud
    private lateinit var listView: ListView
    private lateinit var addButton: Button
    private lateinit var titleInput: EditText
    private lateinit var usernameInput: EditText
    private lateinit var passwordInput: EditText
    private lateinit var notesInput: EditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val db = VaultDB(this).open()
        crud = Crud(db)

        listView = findViewById(R.id.listView)
        addButton = findViewById(R.id.addButton)
        titleInput = findViewById(R.id.titleInput)
        usernameInput = findViewById(R.id.usernameInput)
        passwordInput = findViewById(R.id.passwordInput)
        notesInput = findViewById(R.id.notesInput)

        refreshList()

        addButton.setOnClickListener {
            val entry = Entry(
                id = 0,
                title = titleInput.text.toString(),
                username = usernameInput.text.toString(),
                password = passwordInput.text.toString(),
                notes = notesInput.text.toString(),
                createdAt = ""
            )
            crud.add(entry)
            Toast.makeText(this, "Zapisano!", Toast.LENGTH_SHORT).show()
            clearInputs()
            refreshList()
        }

        listView.setOnItemClickListener { _, _, position, _ ->
            val items = crud.getAll()
            val item = items[position]
            Toast.makeText(this, "Login: ${item.username}\nHasło: ${item.password}", Toast.LENGTH_LONG).show()
        }

        listView.setOnItemLongClickListener { _, _, position, _ ->
            val items = crud.getAll()
            val item = items[position]
            crud.delete(item.id)
            Toast.makeText(this, "Usunięto!", Toast.LENGTH_SHORT).show()
            refreshList()
            true
        }
    }

    private fun refreshList() {
        val items = crud.getAll()
        val titles = items.map { it.title }
        listView.adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, titles)
    }

    private fun clearInputs() {
        titleInput.text.clear()
        usernameInput.text.clear()
        passwordInput.text.clear()
        notesInput.text.clear()
    }
}
