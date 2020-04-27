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

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  ipcMain.on('min_window', (evt, arg) => {
    const bw = BrowserWindow.fromWebContents(evt.sender)

    bw.minimize()
  })

  ipcMain.on('full_window', (evt, arg) => {
    const bw = BrowserWindow.fromWebContents(evt.sender)

    bw.maximize()

    evt.sender.send('maximize_window')
  })

  ipcMain.on('exit_full_window', (evt, arg) => {
    const bw = BrowserWindow.fromWebContents(evt.sender)

    bw.unmaximize()

    evt.sender.send('unmaximize_window')
  })

  ipcMain.on('close_window', (evt) => {
    const bw = BrowserWindow.fromWebContents(evt.sender)

    bw.close()
  })

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
