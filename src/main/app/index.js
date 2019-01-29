import EventBus from './eventBus.js'

export default class App {
  init () {
    this.eventBus = new EventBus()

    this.eventBus.init()
  }
}
