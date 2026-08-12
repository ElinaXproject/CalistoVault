const crud = require("./db/crud");
const sync = require("../shared/sync");

module.exports = {
    async fullSync() {
        const entries = crud.getAll();
        await sync.upload(entries);

        const downloaded = await sync.download();
        downloaded.forEach(e => {
            crud.add({
                title: e.title,
                username: e.username,
                password: e.password,
                notes: e.notes
            });
        });

        return true;
    }
};
