import axios from 'axios'

export default class Search {
  constructor (options) {
    this.app = options
  }

  async cover (evt, arg) {
    const response = await this[arg.target](encodeURI(arg.url))

    evt.returnValue = {
      status: 'success',
      request: {
        params: arg
      },
      response
    }
  }

  async dmzj (url, referer) {
    try {
      const res = await axios.get(url, {
        headers: {
          'Host': 'images.dmzj.com',
          'Accept': '*/*',
          'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
          'Accept-Encoding': 'gzip, deflate',
          'referer': 'http://manhua.dmzj.com/tags/search.shtml',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0'
        },
        responseType: 'arraybuffer'
      })

      return {
        data: res.data,
        type: res.headers['content-type']
      }
    } catch (err) {
      console.error(err)
    }
  }
}
