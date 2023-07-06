const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getLocalDevices: () => ipcRenderer.invoke('get-local-devices')
})