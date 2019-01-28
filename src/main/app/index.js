import EventBus from './eventBus.js'

export default class App {
  constructor (mainWindow) {
    this.mainWindow = mainWindow
  }

  init () {
    console.log(2333, this.mainWindow)

    EventBus()
  }
}
