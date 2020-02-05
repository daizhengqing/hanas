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
      .item(v-for="item in list")
        img(src="/static/image/loading.gif" :id="generateId()" @load.once="getImg(item, $event)" v-contextMenu:ctxMenu="item")
    Control
    
</template>

<script>
  import Scrollbar from 'vue-multiple-scrollbar'
  import Control from './Control'
  import Header from './Header/index'
  import shortid from 'shortid'

  export default {
    name: 'reading',
    components: { Scrollbar, Control, Header },
    data () {
      return {
        list: [],
        store: []
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
      this.$renderer.on('get_image_complete', (evt, arg) => {
        if (arg.state) {
          const { data, type, id } = arg.data

          const blob = new Blob([new Uint8Array(data)], { type })

          const el = document.getElementById(id)

          if (el) {
            el.src = URL.createObjectURL(blob)

            this.store.push(el.src)
          }
        } else {
          this.$toasted.error(arg.message)
        }
      })

      this.$renderer.on('get_chapter_complete', (evt, arg) => {
        if (arg.state) {
          this.list = arg.data
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
      async getImg (url, evt) {
        this.$renderer.send('get_image', {
          url,
          target: this.$store.state.app.current.fromType,
          referer: this.$store.state.app.current.url,
          id: evt.path[0].id
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
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 100;

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