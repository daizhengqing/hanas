import { ipcMain } from 'electron'
export default class Router {
  constructor (options) {
    this.app = options
  }

  /**
   * 初始化
   */
  init () {
    ipcMain.on('searchComic', (evt, arg) => { this.app.service.search.search(evt, arg) })
    ipcMain.on('getCover', (evt, arg) => { this.app.service.images.cover(evt, arg) })
  }
}
