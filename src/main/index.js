'use strict'

import {
  app,
  BrowserWindow,
  ipcMain,
  Menu
} from 'electron'
import Storage from './app/storage.js'
import HANAs from './app/index'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const storage = new Storage()
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

async function createWindow () {
  Menu.setApplicationMenu(null)

  await storage.init()

  mainWindow = new BrowserWindow(storage.config.window)

  mainWindow.loadURL(winURL)

  mainWindow.storage = storage

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
