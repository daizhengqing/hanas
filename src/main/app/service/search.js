// import cheerio from 'cheerio'
import axios from 'axios'

export default class Search {
  constructor (options) {
    this.app = options
  }

  async search (evt, arg) {
    const res = await Promise.all(arg.from.map(item => this[item](arg.keyword, arg.page)))

    evt.returnValue = {
      status: 'success',
      request: {
        params: arg
      },
      response: {
        data: res
      }
    }
  }

  async dmzj (k, p = 1) {
    const url = encodeURI(`http://sacg.dmzj.com/comicsum/search.php?s=${k}&p=${p}`)

    try {
      const res = await axios.get(url, {
        headers: {
          'Host': 'sacg.dmzj.com',
          'Accept': '*/*',
          'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
          'Accept-Encoding': 'gzip, deflate',
          'Referer': encodeURI(`http://manhua.dmzj.com/tags/search.shtml?s=${k}&p=${p}`),
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0'
        }
      })

      const data = JSON.parse(res.data.match(/\[.*\]/gm))

      return data.map(item => {
        return Object.assign(item, {
          name: item.comic_name,
          url: item.comic_url,
          from: '动漫之家',
          fromType: 'dmzj'
        })
      })
    } catch (err) {
      console.log(err)
    }
  }
}
