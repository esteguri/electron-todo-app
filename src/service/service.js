module.exports.ServiceTask = {
    addTask: (task) => {
        let tasks = JSON.parse(localStorage.getItem('TODO:TASK'));
        if (!tasks) {
            tasks = []

        }
        tasks.push(task);
        localStorage.setItem('TODO:TASK', JSON.stringify(tasks));
    },
    getTasks: () => {
        let tasks = JSON.parse(localStorage.getItem('TODO:TASK'));
        if (tasks) {
            return tasks;
        }
        return []
    },
    deleteTask: (position) => {
        let tasks = JSON.parse(localStorage.getItem('TODO:TASK'));
        if (!tasks) {
            tasks = []
        }
        let newTasks = [];
        tasks.forEach((element, index) => {
            if (index != position) {
                newTasks.push(element);
            }
        });
        localStorage.setItem('TODO:TASK', JSON.stringify(newTasks));
    }
}