/* eslint-disable no-unused-vars */
/* eslint-disable no-eval */
'use strict'

onmessage = function (e) {
  this[e.data[1]](e.data[0])
}

function dmzj (data) {
  try {
    let code, pages

    eval(data.match(/eval.*\)\)/gm)[0].replace('eval(', 'eval( code = '))

    code = code.replace('var', '')

    eval(code)

    pages = pages.replace(/\[/gm, '')

    pages = pages.replace(/\]/gm, '')

    pages = pages.replace(/\"/gm, '')

    const res = pages.split(',').map(item => `http://images.dmzj.com/${item}`)

    postMessage({
      state: true,
      data: res
    })
  } catch (err) {
    postMessage({
      state: false,
      message: err.message
    })
  }
}
