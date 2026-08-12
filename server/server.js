const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "./data.json";

// Wczytaj dane z pliku
function loadData() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify({ entries: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Zapisz dane do pliku
function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Upload danych z Windows/Android
app.post("/upload", (req, res) => {
    const { entries } = req.body;

    if (!entries) {
        return res.status(400).json({ error: "Brak danych" });
    }

    const data = loadData();
    data.entries = entries;
    saveData(data);

    console.log("Odebrano dane:", entries.length);
    res.json({ status: "OK" });
});

// Download danych do Windows/Android
app.get("/download", (req, res) => {
    const data = loadData();
    res.json(data);
});

// Start serwera
app.listen(3000, () => {
    console.log("Calisto Sync Server działa na porcie 3000");
});
