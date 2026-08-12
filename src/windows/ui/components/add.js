const crud = require('../../db/crud');

module.exports = {
    render() {
        return `
            <h2>Dodaj wpis</h2>
            <input id="title" placeholder="Tytuł"><br>
            <input id="username" placeholder="Login"><br>
            <input id="password" placeholder="Hasło"><br>
            <textarea id="notes" placeholder="Notatki"></textarea><br>
            <button id="saveBtn">Zapisz</button>
        `;
    },

    init() {
        document.getElementById('saveBtn').onclick = () => {
            crud.add({
                title: document.getElementById('title').value,
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
                notes: document.getElementById('notes').value
            });
            alert("Zapisano!");
            location.reload();
        };
    }
};
