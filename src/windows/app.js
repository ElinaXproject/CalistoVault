const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

const versionFile = path.join(__dirname, '../../version.json');

function loadVersion() {
    try {
        const data = fs.readFileSync(versionFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Błąd podczas wczytywania version.json:", err);
        return null;
    }
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1100,
        height: 700,
        backgroundColor: "#0D0D0D",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    const version = loadVersion();
    console.log("Calisto Vault — wersja:", version?.version || "unknown");

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
