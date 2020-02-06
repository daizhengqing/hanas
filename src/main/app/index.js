import Router from './router.js'
import ChapterService from './service/chapter.js'
import ImagesService from './service/images.js'
import ListService from './service/list.js'
import SearchService from './service/search.js'
import {
  ipcMain
} from 'electron'

export default class App {
  constructor (mainWindow) {
    this.mainWindow = mainWindow

    this.$main = ipcMain

    this.service = {}
    this.router = new Router(this)
  }

  /**
   * 初始化
   */
  async init () {
    this.service.chapter = new ChapterService(this)
    this.service.images = new ImagesService(this)
    this.service.list = new ListService(this)
    this.service.search = new SearchService(this)

    this.router.init()
  }

  /**
   * 加载服务类
   */
  async loadService () {
    // const fs = require('fs')
    // const path = require('path')

    // const pathCollection = await fs.readdirSync(path.join(__dirname, './service'))

    // pathCollection.forEach(filename => {
    //   const Service = require(`./service/${filename}`).default

    //   this.service[filename.replace('.js', '')] = new Service(this)
    // })
  }
}
