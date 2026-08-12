const crud = require('../../db/crud');

module.exports = {
    render(entry) {
        return `
            <h2>${entry.title}</h2>
            <p><b>Login:</b> ${entry.username}</p>
            <p><b>Hasło:</b> ${entry.password}</p>
            <p><b>Notatki:</b><br>${entry.notes}</p>
            <button id="editBtn">Edytuj</button>
            <button id="deleteBtn">Usuń</button>
        `;
    },

    init(id) {
        document.getElementById('editBtn').onclick = () => {
            const edit = require('./edit');
            const entry = crud.get(id);
            document.getElementById('app').innerHTML = edit.render(entry);
            edit.init(id);
        };

        document.getElementById('deleteBtn').onclick = () => {
            if (confirm("Na pewno usunąć?")) {
                crud.delete(id);
                alert("Usunięto!");
                location.reload();
            }
        };
    }
};
