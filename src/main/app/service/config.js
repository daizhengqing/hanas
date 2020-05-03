export default class Config {
  constructor (options) {
    this.app = options
  }

  get (evt, arg) {
    this.app.mainWindow.webContents.send('getConfig', this.app.mainWindow.storage.config)
  }

  async set (evt, arg) {
    const { key, val, isFilePath } = arg

    console.log(key, val, isFilePath)

    const res = await this.app.mainWindow.storage.setItem(key, val, isFilePath)

    this.app.mainWindow.webContents.send('getConfig', res)
  }
}
