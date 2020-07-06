import axios from 'axios'
import iconv from 'iconv-lite'
import cheerio from 'cheerio'

export default class Search {
  constructor (options) {
    this.app = options
  }

  async search (evt, arg) {
    arg.from.forEach(item => this[item](arg.page, arg.utf8Keyword, arg.big5Keyword))
  }

  async dmzj (p = 1, utf8Keyword, big5Keyword) {
    const url = encodeURI(`http://sacg.dmzj.com/comicsum/search.php?s=${utf8Keyword}&p=${p}`)

    try {
      const res = await axios.get(url, {
        headers: {
          'Host': 'sacg.dmzj.com',
          'Accept': '*/*',
          'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
          'Accept-Encoding': 'gzip, deflate',
          'Referer': encodeURI(`http://manhua.dmzj.com/tags/search.shtml?s=${utf8Keyword}&p=${p}`),
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0'
        }
      })

      const data = JSON.parse(res.data.match(/\[.*\]/gm))

      this.app.mainWindow.webContents.send('dmzj_search_complete', {
        data: !data ? [] : Array.from(data, item => {
          return {
            ...item,
            name: item.comic_name,
            cover: `http://localhost:3054/image/dmzj?url=${item.comic_cover}`,
            url: item.comic_url,
            author: item.comic_author,
            last: item.last_update_chapter_name,
            from: '动漫之家',
            fromType: 'dmzj'
          }
        }),
        state: true
      })
    } catch (err) {
      this.app.mainWindow.webContents.send('dmzj_search_complete', {
        state: false,
        message: err.message
      })
    }
  }

  async comic8 (p = 1, utf8Keyword, big5Keyword, referer = 'https://www.comicbus.com/') {
    const url = `https://www.comicbus.com/member/search.aspx?k=${big5Keyword}&page=${p}`

    try {
      const res = await axios.get(url, {
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

      const $ = cheerio.load(res.data)

      const list = $('td[colspan="2"] tr')

      const data = list.map(function (i, item) {
        const cover = $(this).find('div[class="picsize"] img').attr('src')
        const last = $(this).find('div[class="picsize"] num').text()
        const url = $(this).find('a').attr('href')
        const name = $(this).find('b').text()

        return {
          // cover: `http://localhost:3054/image/comic8Cover?url=https://comicbus.com${cover}`,
          cover: `https://comicbus.com${cover}`,
          last,
          url,
          name,
          from: '无限动漫',
          fromType: 'comic8'
        }
      })

      let max = $('#search_pager td')
        .map(function (i, item) {
          return $(this).attr('onclick')
        })
        .toArray()
        .pop()

      console.log(max)

      max = max
        ? max.match(/(?:page=)\d*/)[0]
          .replace('page=', '') >>> 0
        : 1

      console.log(max)

      const more = p < max

      if (more) this.comic8(p + 1, utf8Keyword, big5Keyword)

      this.app.mainWindow.webContents.send('comic8_search_complete', {
        data: data.toArray().filter(item => item.name),
        state: true,
        more
      })

      console.timeEnd()
    } catch (err) {
      console.log(err)
      this.app.mainWindow.webContents.send('comic8_search_complete', {
        state: false,
        message: err.message
      })
    }
  }
}
