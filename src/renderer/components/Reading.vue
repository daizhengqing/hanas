<template lang="pug">
  .container
    context-menu(ref="ctxMenu")
      context-menu-item(@click="onRushClick") 刷新此图
    .header
      Header
        div(slot="left")
          mu-button.button(flat style="margin-left: -16px" @click="onBackClick")
            i.iconfont.icon-arrow_back
        div(slot="center") {{ $store.state.app.current.title }}
    Scrollbar(ref="scrollbar")
      .item(v-for="item, index in list")
        lazy-component(style="min-height: 500px;" @show="onShow")
          img(:src="require('@/assets/image/loading.gif')" :id="generateId()" :data-image="item" v-contextMenu:ctxMenu="item")
        span(style="color: #fff;") {{ `${index + 1}/${list.length}` }}
    Control

</template>

<script>
  import Scrollbar from 'vue-multiple-scrollbar'
  import Control from './Control'
  import Header from './Header/index'
  import shortid from 'shortid'
  import path from 'path'

  export default {
    name: 'reading',
    components: { Scrollbar, Control, Header },
    data () {
      return {
        list: [],
        store: [],
        analysisWorker: null
      }
    },
    watch: {
      '$store.state.app.current': {
        deep: true,
        handler: function (nv, ov) {
          this.list = []
          this.getCharpter()
        }
      },
      list (nv, ov) {
        this.store.forEach(item => {
          URL.revokeObjectURL(item)
        })
      }
    },
    mounted () {
      const analysisWorkerPath = process.env.NODE_ENV === 'development'
        ? '/static/worker/analysis.js'
        : path.join(__dirname, '/static/worker/analysis.js')

      this.analysisWorker = new Worker(analysisWorkerPath)

      const bufferToBlobWorkerPath = process.env.NODE_ENV === 'development'
        ? '/static/worker/bufferToBlob.js'
        : path.join(__dirname, '/static/worker/bufferToBlob.js')

      this.bufferToBlobWorker = new Worker(bufferToBlobWorkerPath)

      this.$renderer.on('get_image_complete', (evt, arg) => {
        if (arg.state) {
          const { id, data, type } = arg.data

          this.bufferToBlobWorker.postMessage([data, type, id])

          this.bufferToBlobWorker.onmessage = e => {
            const el = document.getElementById(e.data.id)

            if (el) {
              el.src = e.data.data

              this.store.push(el.src)
            }
          }
        } else {
          this.$toasted.error(arg.message)
        }
      })

      this.$renderer.on('get_chapter_complete', (evt, arg) => {
        if (arg.state) {
          this.analysisWorker.postMessage([arg.data, arg.type])

          this.analysisWorker.onmessage = e => { e.data.state ? this.list = e.data.data : this.$toasted.error(arg.message) }
        } else {
          this.$toasted.error(arg.message)
        }
      })

      this.getCharpter()

      this.$toasted.show('Tips: 图片加载过慢可以右键刷新它哦')
    },
    beforeDestroy () {
      this.$renderer.removeAllListeners('get_chapter_complete')
      this.$renderer.removeAllListeners('get_image_complete')
    },
    methods: {
      generateId () {
        return shortid.generate()
      },
      async getCharpter () {
        const params = {
          url: this.$store.state.app.current.url,
          target: this.$store.state.app.current.fromType
        }

        this.$renderer.send('get_chapter', params)
      },
      async onShow (component) {
        this.$nextTick(() => {
          const img = component.$el.querySelector('img')

          img ? this.$renderer.send('get_image', {
            url: img.dataset.image,
            target: this.$store.state.app.current.fromType,
            referer: this.$store.state.app.current.url,
            id: img.id
          }) : null
        })
      },
      onBackClick () {
        this.$store.commit('app/setReadingState', false)
        this.$store.commit('app/setCurrentReading', {})
      },
      onRushClick (url, el) {
        this.$renderer.send('get_image', {
          url,
          target: this.$store.state.app.current.fromType,
          referer: this.$store.state.app.current.url,
          id: el.id
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 100;
    overflow: hidden;

    .item {
      text-align: center;

      img {
        max-width: 100%;
      }
    }
  }

  .header {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 999;
    background: rgba(0,0,0,.8);
  }

  /deep/ .vm-scrollbar {
    height: calc(100%);
  }

  /deep/ .vm-scrollbar__wrap {
    height: 100%;
    overflow-x: hidden;
  }
</style>