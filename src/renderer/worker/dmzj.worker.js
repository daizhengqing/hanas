/* eslint-disable no-unused-vars */
/* eslint-disable no-eval */
'use strict'
import axios from 'axios'
import cheerio from 'cheerio'

onmessage = async function (e) {
  // const [data, type, id] = e.data

  // const blob = new Blob([new Uint8Array(data)], { type })

  // const res = URL.createObjectURL(blob)

  // this.postMessage({
  //   data: res,
  //   id
  // })

  // console.log(e)
  // console.log(axios)
  // console.log(cheerio)
  const [funcName, data] = e.data

  console.log(this, funcName, data)

  const res = await functions[funcName](data)

  this.postMessage(res)
}

const functions = {
}
