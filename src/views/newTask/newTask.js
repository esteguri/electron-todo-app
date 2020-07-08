const { NewTaskWindow } = require("../../windows/newTask");
const { ipcRenderer } = require('electron');

document.getElementById("formNewTask").addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementsByName("title")[0].value;
    let description = document.getElementsByName("description")[0].value;
    ipcRenderer.send('task:newTask', {
        title,
        description
    });


});