/* eslint-disable no-useless-escape */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
import axios from 'axios'

export default class Chapter {
  constructor (options) {
    this.app = options
  }

  async get (evt, arg) {
    try {
      const data = await this[arg.target](encodeURI(arg.url))

      this.app.mainWindow.webContents.send('get_chapter_complete', {
        data,
        state: true
      })
    } catch (err) {
      this.app.mainWindow.webContents.send('get_chapter_complete', {
        state: false,
        message: err.message
      })
    }
  }

  async dmzj (url, referer) {
    try {
      let pages

      let code

      const res = await axios.get(url)

      eval(res.data.match(/eval.*\)\)/gm)[0].replace('eval(', 'eval( code = '))

      code = code.replace('var', '')

      eval(code)

      pages = pages.replace(/\[/gm, '')

      pages = pages.replace(/\]/gm, '')

      pages = pages.replace(/\"/gm, '')

      return pages.split(',').map(item => `http://images.dmzj.com/${item}`)
    } catch (err) {
      throw new Error(err)
    }
  }
}
