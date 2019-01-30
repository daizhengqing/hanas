import EventBus from './eventBus.js'

export default class App {
  constructor () {
    this.test = 233

    this.eventBus = new EventBus(this)
  }

  init () {
    this.eventBus.init()
  }
}
