const { initDatabase } = require('./sqlcipher');
const db = initDatabase();

module.exports = {
    getAll() {
        return db.prepare("SELECT * FROM entries ORDER BY id DESC").all();
    },

    add(entry) {
        const stmt = db.prepare(`
            INSERT INTO entries (title, username, password, notes, created_at)
            VALUES (?, ?, ?, ?, datetime('now'))
        `);
        stmt.run(entry.title, entry.username, entry.password, entry.notes);
    },

    get(id) {
        return db.prepare("SELECT * FROM entries WHERE id = ?").get(id);
    },

    update(id, entry) {
        const stmt = db.prepare(`
            UPDATE entries SET title=?, username=?, password=?, notes=?
            WHERE id=?
        `);
        stmt.run(entry.title, entry.username, entry.password, entry.notes, id);
    },

    delete(id) {
        db.prepare("DELETE FROM entries WHERE id = ?").run(id);
    }
};
