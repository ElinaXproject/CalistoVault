const crud = require('../../db/crud');

module.exports = {
    render(entry) {
        return `
            <h2>Edytuj wpis</h2>
            <input id="title" value="${entry.title}"><br>
            <input id="username" value="${entry.username}"><br>
            <input id="password" value="${entry.password}"><br>
            <textarea id="notes">${entry.notes}</textarea><br>
            <button id="saveEditBtn">Zapisz zmiany</button>
        `;
    },

    init(id) {
        document.getElementById('saveEditBtn').onclick = () => {
            crud.update(id, {
                title: document.getElementById('title').value,
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
                notes: document.getElementById('notes').value
            });
            alert("Zaktualizowano!");
            location.reload();
        };
    }
};
