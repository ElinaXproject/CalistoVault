const fs = require('fs');
const path = require('path');

module.exports = {
    loadVersion() {
        try {
            const file = path.join(__dirname, '../../version.json');
            const data = fs.readFileSync(file, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error("Błąd ładowania version.json:", err);
            return null;
        }
    }
};
