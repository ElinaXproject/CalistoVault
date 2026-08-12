const { app, BrowserWindow } = require('electron');
const path = require('path');
const { initDatabase } = require('./db/sqlcipher');

let mainWindow;
let db;

function createWindow() {
    db = initDatabase();

    mainWindow = new BrowserWindow({
        width: 1100,
        height: 700,
        backgroundColor: "#0D0D0D",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);
