import { ipcMain } from 'electron'
export default class Router {
  constructor (options) {
    this.app = options
  }

  /**
   * 初始化
   */
  init () {
    ipcMain.on('search-comic', (evt, arg) => { this.app.service.search.search(evt, arg) })
  }
}
