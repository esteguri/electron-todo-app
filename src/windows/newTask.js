const { BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');

let mainMenu = []
let newTaskWindow;

const createNewTaskWindow = () => {
    if (newTaskWindow) {
        newTaskWindow.close();
    }
    newTaskWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 400,
        height: 300,
        center: true,
    });

    newTaskWindow.setMenu(Menu.buildFromTemplate(mainMenu));

    newTaskWindow.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: path.join(__dirname, '../views/newTask/newTask.html')
    }));

    newTaskWindow.on('closed', () => {
        newTaskWindow = null;
    });
}

if (process.env.NODE_ENV !== 'production') {
    mainMenu.push({
        label: 'DevTools',
        submenu: [{
                label: 'Show/Hide DevTools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                label: 'Reload',
                role: 'reaload'
            }
        ]
    })
}
module.exports.NewTaskWindow = createNewTaskWindow;