const path = require('path');
const { app, Menu, Tray, nativeImage, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
let tray;

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
        nodeIntegration: true,
        },
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(
        isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );
    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}

function createTrayIcon() {
    const icon = nativeImage.createFromDataURL(`http://localhost:3000/favicon.ico'`);
    tray = new Tray(icon);
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
    ]);

    // tray.setContextMenu(contextMenu);
    tray.setToolTip('This is my application.');

    tray.on('click', () => {
        console.log('tray clicked');
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then( () => {
    createTrayIcon();
    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
