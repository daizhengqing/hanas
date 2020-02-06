/* eslint-disable no-unused-vars */
/* eslint-disable no-eval */
'use strict'

onmessage = function (e) {
  const [data, type] = e.data

  const blob = new Blob([new Uint8Array(data)], { type })

  const res = URL.createObjectURL(blob)

  this.postMessage(res)
}
