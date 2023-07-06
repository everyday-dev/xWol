const path = require('path');
const { app, Menu, Tray, screen, nativeImage, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const localDev = require('local-devices');

let win;
let tray;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 300,
        height: 400,
        resizable: false,
        frame: false,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });

    // Load our entrypoint
    win.loadURL(
        isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );

    // Open the DevTools.
    if (isDev) {
        // win.webContents.openDevTools({ mode: 'detach' });
    }
}

function createTrayIcon() {
    const icon = nativeImage.createFromDataURL(`http://localhost:3000/favicon.ico'`);
    tray = new Tray(icon);
    tray.setToolTip('xWOL');

    tray.on('click', () => {
        const { width: windowWidth, height: windowHeight } = win.getBounds();
        const cursorPosition = screen.getCursorScreenPoint();
        const { x, y } = cursorPosition;
        const desiredX = x - windowWidth / 2;
        const desiredY = y + 10; // Adjust this value based on your preference
        // Set the window position below the taskbar balloon
        win.isVisible() ? win.hide() : win.show();
        win.setPosition(desiredX, desiredY);
    });
}

async function getLocalDevices() {
    // Retrieve the list of devices on the network
    const devices = await localDev({address: '192.168.4.0/24'});
    // Filter out the gateway
    const gatewayIdx = devices.findIndex(device => device.name === '_gateway');
    if(gatewayIdx > -1) {
        devices.splice(gatewayIdx, 1);
    }
    // Return the device list
    return devices;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then( () => {
    ipcMain.handle('get-local-devices', getLocalDevices);

    createWindow();
    createTrayIcon();

    if(win.isVisible()) {
        win.hide();
    }
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
        createTrayIcon();
        if(win.isVisible()) {
            win.hide();
        }
    }
});