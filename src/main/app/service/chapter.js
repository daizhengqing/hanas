/* eslint-disable no-useless-escape */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
import axios from 'axios'
import iconv from 'iconv-lite'
import cheerio from 'cheerio'

export default class Chapter {
  constructor (options) {
    this.app = options
  }

  async get (evt, arg) {
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

  async comic8 (url, ch = null, p = 1, referer = 'https://www.comicbus.com/') {
    if (!ch) ch = url.replace(/.*=/, '').replace(/'/, '')

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

      /* eslint-disable */
      const $ = cheerio.load(res.data)

      const target = $(Array.from($('script')).sort((a, b) => { return $(a).html().length - $(b).html().length }).pop()).html()

      let [src, total] = (function (target) {
        var y = 46

        function su(a, b, c){
          var e = (a + '').substring(b, b + c)

          return (e)
        }

        function nn(n) {
          return n < 10 ? '00' + n : n < 100 ? '0' + n : n;
        }

        function mm(p){
          return (parseInt((p - 1) / 10) % 10 )+(((p - 1) % 10) * 3)
        };

        function lc(l){
          if(l.length != 2) return l;
          var az = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          var a = l.substring(0,1);
          var b = l.substring(1,2);
          if( a == "Z") return 8000 + az.indexOf(b);
          else return az.indexOf(a) * 52 + az.indexOf(b);
        }

        function spp () {}

        target = target.replace(/ge\('TheImg'\)\./, 'var ')

        target = target.replace(/request\('ch'\)/, `'${ch}-${p}'`)

        var document = {
          getElementById () {}
        }

        var url, total

        eval(target + "url = src; total = ps")

        return [url, total]
      })(target)

      const list = [
        src
      ]

      console.log(url)

      if (p === 1) {
        for (let i = 2; i < total; i++) {
          list.push(`http://localhost:3054/image/comic8?url=${url.replace(/'/, '')}-${i}&ch=${ch}&p=${i}`)
        }

        return list
      }
      /* eslint-enablconsole.log(err)e */
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }
}
