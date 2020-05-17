import Koa from 'koa'
import Router from 'koa-router'

export default class ImageServer {
  constructor (app) {
    this.app = app
  }

  init () {
    const server = new Koa()
    const router = new Router()

    router.get('/image/dmzj', ctx => this.dmzjImage(ctx))
    router.get('/image/comic8Cover', ctx => this.comic8Cover(ctx))

    server.use(router.routes())
    server.use(router.allowedMethods())

    server.listen('3054')

    console.log('server started at port 3054')
  }

  async dmzjImage (ctx) {
    const url = ctx.query.url

    if (!url) {
      ctx.status = 404
      ctx.body = 'url not found'
    } else {
      const res = await this.app.service.images.dmzj(encodeURI(url))

      ctx.set('Cache-Control', `max-age=${2 * 3600}`)
      ctx.body = res.data
    }
  }

  async comic8Cover (ctx) {
    const url = ctx.query.url

    if (!url) {
      ctx.status = 404
      ctx.body = 'url not found'
    } else {
      const res = await this.app.service.images.comic8Cover(encodeURI(url))

      ctx.set('Cache-Control', `max-age=${2 * 3600}`)
      ctx.body = res.data
    }
  }
}
