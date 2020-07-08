const { NewTaskWindow } = require('../windows/newTask')

module.exports.mainMenu = [{
    label: 'New Task',
    click() {
        NewTaskWindow();
    }
}, ]