const crud = require("../../db/crud");
const sync = require("../../../shared/sync");

module.exports = {
    render() {
        return `
            <h2>Synchronizacja</h2>
            <p>Wysyłanie i pobieranie danych z serwera.</p>
            <button id="uploadBtn">Wyślij dane</button>
            <button id="downloadBtn">Pobierz dane</button>
        `;
    },

    init() {
        document.getElementById("uploadBtn").onclick = async () => {
            const entries = crud.getAll();
            await sync.upload(entries);
            alert("Dane wysłane!");
        };

        document.getElementById("downloadBtn").onclick = async () => {
            const downloaded = await sync.download();
            downloaded.forEach(e => {
                crud.add({
                    title: e.title,
                    username: e.username,
                    password: e.password,
                    notes: e.notes
                });
            });
            alert("Dane pobrane!");
            location.reload();
        };
    }
};
