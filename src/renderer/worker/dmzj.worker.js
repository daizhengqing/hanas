/* eslint-disable no-unused-vars */
/* eslint-disable no-eval */
'use strict'
import axios from 'axios'
import cheerio from 'cheerio'

onmessage = async function (e) {
  const [funcName, data] = e.data

  console.log(this, funcName, data)

  const res = await functions[funcName](data)

  this.postMessage(res)
}

const functions = {
}
