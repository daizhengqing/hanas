import axios from 'axios'

export default class Images {
  constructor (options) {
    this.app = options
  }

  async get (evt, arg) {
    try {
      const data = await this[arg.target](arg.url, arg.referer, arg.id)

      this.app.mainWindow.webContents.send('get_image_complete', {
        data,
        state: true
      })
    } catch (err) {
      this.app.mainWindow.webContents.send('get_image_complete', {
        state: false,
        message: err.message
      })
    }
  }

  async dmzj (url, referer = 'http://manhua.dmzj.com/tags/search.shtm', id) {
    try {
      const res = await axios.get(url, {
        headers: {
          'Host': 'images.dmzj.com',
          'Accept': 'image/webp,*/*',
          'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Charset': 'utf-8, iso-8859-1;q=0.5',
          'referer': referer,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0'
        },
        // responseType: 'arraybuffer'
        responseType: 'stream'
      })

      return res

      // return {
      //   data: res.data,
      //   id,
      //   type: res.headers['content-type']
      // }
    } catch (err) {
      throw new Error(err)
    }
  }
}
