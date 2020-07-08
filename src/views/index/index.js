const { ServiceTask } = require('../../service/service');
const { ipcRenderer } = require('electron');

window.onload = () => {
    fillTask()
}

ipcRenderer.on('task:newTask', (e, task) => {
    addTask(task.title, task.description);
});

const fillTask = () => {
    let containerTasks = document.getElementById('container-tasks');
    containerTasks.innerHTML = ''

    let tasks = ServiceTask.getTasks();
    tasks.forEach((task, index) => {
        let element = `
        <div class="col-4 pt-2">
            <div class="card text-center">
                <div class="card-header">
                    ${task.title}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${task.description}</h5>
                    <button onclick="deleteTask(${index})" class="btn btn-danger">Eliminar</button>
                </div>
                <div class="card-footer text-muted">
                    ${task.date}
                </div>
            </div>
        </div>
        `
        containerTasks.innerHTML += element
    });
}

const addTask = (title, description) => {
    ServiceTask.addTask({
        title,
        description,
        date: new Date().toDateString()
    });
    fillTask();
}

const deleteTask = (position) => {
    ServiceTask.deleteTask(position);
    fillTask();
}