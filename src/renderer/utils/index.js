export function urlEncode (text, charset) {
  const form = document.createElement('form')
  const input = document.createElement('input')
  const iframe = document.createElement('iframe')

  form.target = 'urlEncode_iframe'

  form.action = 'about:blank'

  form.method = 'get'

  form.acceptCharset = charset

  form.display = 'none'

  input.value = text

  input.name = 't'

  iframe.name = 'urlEncode_iframe'

  iframe.src = 'about:blank'

  iframe.display = 'none'

  form.appendChild(input)

  document.body.appendChild(form)

  document.body.appendChild(iframe)

  form.submit()

  iframe.onloadstart = () => { iframe.innerHTML = '<!DOCTYPE html><html lang="en"></html>' }

  return new Promise((resolve, reject) => {
    iframe.onload = () => {
      const res = iframe.contentWindow.location.search.replace('?t=', '')

      document.body.removeChild(form)
      document.body.removeChild(iframe)

      resolve(res)
    }
  })
}
