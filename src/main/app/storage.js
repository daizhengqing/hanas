import { app } from 'electron'
import fs from 'fs'
import path from 'path'
import appConfig from '../index.config.js'

export default class Storage {
  constructor () {
    this.userData = path.join(app.getPath('userData'), 'config.json')

    this.config = {}

    console.log('User Data Path', this.userData)
  }

  async init () {
    const hasConfig = await this.has()

    if (!hasConfig) {
      const res = await this.create()

      this.config = JSON.parse(res)
    } else {
      const res = await new Promise((resolve) => {
        fs.readFile(this.userData, (err, data) => {
          if (!err) resolve(data)
        })
      })

      this.config = JSON.parse(res)
    }
  }

  has () {
    return new Promise((resolve) => {
      fs.stat(this.userData, (err, stats) => {
        err ? resolve(false) : stats ? resolve(true) : resolve(false)
      })
    })
  }

  async create () {
    const defaultConfig = JSON.stringify({
      ...appConfig,
      dp: app.getPath('downloads')
    })

    return new Promise((resolve) => {
      fs.writeFile(this.userData, defaultConfig, (err, data) => {
        if (!err) resolve(defaultConfig)
      })
    })
  }

  async set (nv) {
    return new Promise(resolve => {
      fs.writeFile(this.userData, JSON.stringify(nv), (err, data) => {
        if (!err) {
          resolve()
        }
      })
    })
  }

  async setItem (key, value, isFilePath) {
    return new Promise(async resolve => {
      if (isFilePath) {
        const to = path.join(app.getPath('userData'), `bg-${Date.now()}-${value.match(/\.gif|\.jpeg|\.png|\.jpg|\.bmp/i)[0]}`)

        await this.cp(to, value)

        if (this.config[key]) await this.rm(this.config[key])

        this.config[key] = to

        await this.set(this.config)

        resolve(this.config)
      } else {
        this.config[key] = value

        await this.set(this.config)

        resolve(this.config)
      }
    })
  }

  rm (from) {
    return new Promise(resolve => {
      fs.unlink(from, (err, data) => {
        if (!err) resolve()
      })
    })
  }

  cp (to, from) {
    return new Promise(resolve => {
      fs.readFile(from, (err, data) => {
        if (!err) {
          fs.writeFile(to, data, (err) => {
            if (!err) {
              resolve()
            }
          })
        }
      })
    })
  }

  remove (key) {
    delete this.config[key]
  }
}
