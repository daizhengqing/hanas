import Router from './router.js'
import Chapter from './service/chapter.js'
import Images from './service/images.js'
import List from './service/list.js'
import Search from './service/search.js'
import ImageServer from './image-server.js'
import {
  ipcMain
} from 'electron'

export default class App {
  constructor (mainWindow) {
    this.mainWindow = mainWindow

    this.$main = ipcMain

    this.service = {}
    this.router = new Router(this)
    this.ImageServer = new ImageServer(this)
  }

  /**
   * 初始化
   */
  async init () {
    this.service.chapter = new Chapter(this)
    this.service.images = new Images(this)
    this.service.list = new List(this)
    this.service.search = new Search(this)

    this.router.init()

    this.ImageServer.init()
  }
}
