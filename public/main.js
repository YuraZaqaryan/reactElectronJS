const { app, BrowserWindow } = require('electron')
const path = require('path')

require('@electron/remote/main').initialize()
let win;
async function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            enableRemoteModule: true
        }
    })

    await win.loadURL('http://localhost:3000')

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    })
}

app.whenReady().then(async () => {
    await createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})