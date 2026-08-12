const crud = require("../db/crud");
const header = require("./components/header");
const add = require("./components/add");
const view = require("./components/view");
const syncComponent = require("./components/sync");

function renderList() {
    const entries = crud.getAll();
    let html = "<h2>Twoje wpisy</h2>";

    if (entries.length === 0) {
        html += "<p>Brak wpisów.</p>";
    } else {
        entries.forEach(e => {
            html += `<div class="item" data-id="${e.id}">
                        <b>${e.title}</b><br>
                        ${e.username}
                     </div>`;
        });
    }

    document.getElementById("list").innerHTML = html;

    document.querySelectorAll(".item").forEach(el => {
        el.onclick = () => {
            const id = el.getAttribute("data-id");
            const entry = crud.get(id);
            document.getElementById("app").innerHTML = view.render(entry);
            view.init(id);
        };
    });
}

function render() {
    const app = document.getElementById("app");

    app.innerHTML = `
        ${header.render()}
        <button id="addBtn">Dodaj wpis</button>
        <button id="syncBtn">Synchronizacja</button>
        <div id="list"></div>
    `;

    document.getElementById("addBtn").onclick = () => {
        app.innerHTML = add.render();
        add.init();
    };

    document.getElementById("syncBtn").onclick = () => {
        app.innerHTML = syncComponent.render();
        syncComponent.init();
    };

    renderList();
}

window.onload = render;
