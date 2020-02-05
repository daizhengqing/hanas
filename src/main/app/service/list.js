import axios from 'axios'
import cheerio from 'cheerio'

export default class List {
  constructor (options) {
    this.app = options
  }

  async get (evt, arg) {
    try {
      const data = await this[arg.target](arg.url)

      this.app.mainWindow.webContents.send('get_list_complete', {
        data,
        state: true
      })
    } catch (err) {
      this.app.mainWindow.webContents.send('get_list_complete', {
        state: false,
        message: err.message
      })
    }
  }

  async dmzj (url) {
    try {
      const res = await axios.get(`https:${url}`)

      const $ = cheerio.load(res.data)

      const list = Array.from($('.cartoon_online_border a'))

      return list.map(item => {
        return {
          url: `https://manhua.dmzj.com${item.attribs.href}`,
          title: item.children[0].data
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }
}
