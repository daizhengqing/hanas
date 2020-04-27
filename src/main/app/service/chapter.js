/* eslint-disable no-useless-escape */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
import axios from 'axios'

export default class Chapter {
  constructor (options) {
    this.app = options
  }

  async get (evt, arg) {
    console.log(evt, arg)

    try {
      const data = await this[arg.target](encodeURI(arg.url))

      evt.sender.send('get_chapter_complete', {
        data,
        type: arg.target,
        state: true
      })
    } catch (err) {
      evt.sender.send('get_chapter_complete', {
        state: false,
        message: err.message
      })
    }
  }

  async dmzj (url, referer) {
    try {
      const res = await axios.get(url)

      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }
}
