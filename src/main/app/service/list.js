import axios from 'axios'
import iconv from 'iconv-lite'
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

      return Array.from(list, item => {
        return {
          url: `https://manhua.dmzj.com${item.attribs.href}`,
          title: item.children[0].data
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async comic8 (url, referer = 'https://www.comicbus.com/') {
    console.log(url)

    try {
      const res = await axios.get(`https://comicbus.com${url}`, {
        headers: {
          'Host': 'www.comicbus.com',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
          'Accept-Encoding': 'gzip, deflate, br',
          'Referer': referer,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:73.0) Gecko/20100101 Firefox/73.0',
          'Cookie': 'RI=0',
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'arraybuffer',
        transformResponse: [
          function (data) {
            data = iconv.decode(data, 'big5')

            return data
          }
        ]
      })

      const decode = (url, id, r) => {
        url = url.replace('.html', '').replace('-', '.html?ch=')

        if (r === '1') {
          return `https://comicbus.live/online/comic-${url}`
        } else {
          return `https://comicbus.live/online/manga_${url}`
        }
      }

      console.time()

      const $ = cheerio.load(res.data)

      const list = $('#div_li1 td a')

      const data = list.map(function (i, item) {
        return {
          title: $(item).text().replace('\n ', ''),
          url: decode(...$(item).attr('onclick').match(/[0-9].*(?=\))/ig)[0].split(','))
        }
      })

      console.log(data.toArray())

      console.timeEnd()

      return data.toArray()
    } catch (err) {
      console.log(err)
    }
  }
}
