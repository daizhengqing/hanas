import { ipcMain } from 'electron'
export default class Router {
  constructor (options) {
    this.app = options
  }

  /**
   * 初始化
   */
  init () {
    ipcMain.on('search_comic', (evt, arg) => { this.app.service.search.search(evt, arg) })
    ipcMain.on('get_image', (evt, arg) => { this.app.service.images.get(evt, arg) })
    ipcMain.on('get_list', (evt, arg) => { this.app.service.list.get(evt, arg) })
    ipcMain.on('get_chapter', (evt, arg) => { this.app.service.chapter.get(evt, arg) })
    ipcMain.on('get_config', () => { this.app.service.config.get() })
    ipcMain.on('set_config', (evt, arg) => { this.app.service.config.set(evt, arg) })
  }
}
