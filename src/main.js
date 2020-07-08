const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const { mainMenu } = require('./config/menus');
const url = require('url');
const path = require('path');
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
});

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 800,
        height: 500,
        center: true,
    });
    mainWindow.setMinimumSize(800, 500);
    mainWindow.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: path.join(__dirname, 'views/index/index.html')
    }));

    Menu.setApplicationMenu(Menu.buildFromTemplate(mainMenu));

    mainWindow.on('closed', () => {
        app.quit();
    });

});

ipcMain.on('task:newTask', (e, task) => {
    mainWindow.webContents.send('task:newTask', task);
});

if (process.platform === 'darwin') {
    mainMenu.unshift({
        label: app.getName()
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