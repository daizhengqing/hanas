export default class Config {
  constructor (options) {
    this.app = options
  }

  get (evt, arg) {
    evt.sender.send('get_config', this.app.mainWindow.storage.config)
  }

  async set (evt, arg) {
    const { key, val, isFilePath } = arg

    const res = await this.app.mainWindow.storage.setItem(key, val, isFilePath)

    evt.sender.send('get_config', res)
  }
}
