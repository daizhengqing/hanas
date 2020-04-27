<template lang="pug">
  div
</template>

<script>
  import path from 'path'
  export default {
    mounted () {
      const analysisWorkerPath = process.env.NODE_ENV === 'development'
        ? '/static/worker/analysis.js'
        : path.join(__dirname, '/static/worker/analysis.js')

      this.analysisWorker = new Worker(analysisWorkerPath)

      this.$renderer.on('search_complete', (evt, arg) => {
        if (arg.state) {
          this.onSearchComplete(arg.data)
        } else {
          this.$toasted.error(arg.message)
        }
      })
    },
    methods: {
      onSearchComplete (data) {
        const iframe = document.createElement('iframe')

        iframe.src = 'about:blank'

        document.body.appendChild(iframe)

        iframe.contentWindow.document.write(data)

        window.text = data

        // console.log(iframe.contentWindow.document)

        iframe.onload = () => {
          const items = Array.from(iframe.contentWindow.document.querySelectorAll('td[colspan="2"] tr'))

          console.log(items)
        }
      }
    }
  }
</script>