'use strict'

import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'
import config from './index.config.js'
import HANAs from './app/index'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow(config)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('maximize-window')
  })

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('unmaximize-window')
  })

  ipcMain.on('min-window', () => { mainWindow.minimize() })
  ipcMain.on('full-window', () => { mainWindow.maximize() })
  ipcMain.on('exit-full-window', () => { mainWindow.unmaximize() })
  ipcMain.on('close-window', () => { mainWindow.close() })

  const hanas = new HANAs(mainWindow)

  hanas.init()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
