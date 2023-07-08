const path = require('path');
const { app, Menu, Tray, screen, nativeImage, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const localDev = require('local-devices');
const Store = require('electron-store');
const Ping = require('ping');
const os = require('os');

let win;
let tray;
const configStore = new Store();
let devices = [];

function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();

    for (const interfaceName in interfaces) {
        const interfaceDetails = interfaces[interfaceName];
        for (const interfaceInfo of interfaceDetails) {
            if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
                return interfaceInfo.address;
            }
        }
    }

    return null;
}

function getNetworkBaseAddress(ipAddress, subnetPrefix) {
    const ipAddressParts = ipAddress.split('.');
    const subnetMask = ~(2 ** (32 - subnetPrefix) - 1);

    const networkBaseParts = ipAddressParts.map((part, index) => {
        const ipPart = parseInt(part, 10);
        const subnetPart = subnetMask >>> (8 * (3 - index));
        return ipPart & subnetPart;
    });

    return networkBaseParts.join('.');
}

async function getLocalDevices() {
    // Retrieve the list of devices on the network
    const localdevices = await localDev({address: `${getNetworkBaseAddress(getLocalIpAddress(), 24)}/24`});
    // Filter out the gateway
    const gatewayIdx = localdevices.findIndex(device => device.name === '_gateway');
    if(gatewayIdx > -1) {
        localdevices.splice(gatewayIdx, 1);
    }

    // Iterate over our devices list and remove those from the
    // local devices array
    const configuredDevices = await getConfiguredDevices();
    configuredDevices.forEach(configuredDevice => {
        const idx = localdevices.findIndex(device => device.mac === configuredDevice.mac);
        if(idx > -1) {
            localdevices.splice(idx, 1);
        }
    });
    // Return the device list
    return localdevices;
}

async function addDevice(e, device) {
    // Add the device to our config
    devices.push(device);
    configStore.set('devices', devices);
}

async function getConfiguredDevices() {
    return configStore.get('devices', []);
}

async function isDeviceAwake(e, ip, timeout) {
    const res = await Ping.promise.probe(ip, {
        timeout: timeout,
    });

    return res.alive
}

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

    win.on('blur', () => {
        // win.isVisible() ? win.hide() : null;
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then( () => {
    // Read out our device config
    configStore.delete('devices');
    devices = configStore.get('devices', []);

    // Set up our IPC handlers
    ipcMain.handle('get-local-devices', getLocalDevices);
    ipcMain.handle('add-device', addDevice);
    ipcMain.handle('get-configured-devices', getConfiguredDevices);
    ipcMain.handle('is-device-awake', isDeviceAwake);

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