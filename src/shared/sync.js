const axios = require('axios');

const SERVER_URL = "https://your-sync-server-url.com";

module.exports = {
    async upload(entries) {
        try {
            await axios.post(`${SERVER_URL}/upload`, { entries });
            console.log("Synchronizacja: wysłano dane");
        } catch (e) {
            console.error("Błąd wysyłania:", e);
        }
    },

    async download() {
        try {
            const res = await axios.get(`${SERVER_URL}/download`);
            console.log("Synchronizacja: pobrano dane");
            return res.data.entries;
        } catch (e) {
            console.error("Błąd pobierania:", e);
            return [];
        }
    }
};
