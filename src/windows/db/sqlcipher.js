const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'vault.db');

function initDatabase() {
    const db = new Database(dbPath);
    db.pragma("key = 'calisto_master_key'");
    db.prepare(`
        CREATE TABLE IF NOT EXISTS entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            username TEXT,
            password TEXT,
            notes TEXT,
            created_at TEXT
        )
    `).run();
    return db;
}

module.exports = { initDatabase };
