const header = require('./components/header');
const list = require('./components/list');

window.onload = () => {
    const app = document.getElementById('app');
    app.innerHTML = header.render() + list.renderEmpty();
};
