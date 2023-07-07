const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getLocalDevices: () => ipcRenderer.invoke('get-local-devices'),
    addDevice: (device) => ipcRenderer.invoke('add-device', device),
    getConfiguredDevices: () => ipcRenderer.invoke('get-configured-devices')
})