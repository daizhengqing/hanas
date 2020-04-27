<template lang="pug">
  .container
    context-menu(ref="ctxMenu")
      context-menu-item(@click="onRushClick") 刷新此图
    Scrollbar
      .item(v-for="item, index in list")
        img(v-lazy="item" :loading="require('@/assets/image/loading.gif')")
        span(style="color: #fff;") {{ `${index + 1}/${list.length}` }}
    .control
      mu-button.button(flat style="color: #fff;" @click="() => {}")
        mu-icon(value="list")
      mu-button.button(flat style="color: #fff;" @click="onPreviousClick")
        mu-icon(value="keyboard_arrow_left")
      mu-button.button(flat style="color: #fff;" @click="onNextClick")
        mu-icon(value="keyboard_arrow_right")
      mu-button.button(flat style="color: #fff;" @click="() => {}")
        mu-icon(value="settings")
</template>

<script>
  import Scrollbar from 'vue-multiple-scrollbar'
  import Header from '@/components/Header/index'
  import AnalysisWorker from '@/worker/analysis.worker.js'

  export default {
    name: 'reading',
    components: { Scrollbar, Header },
    data () {
      return {
        comic: {},
        current: {},
        chapterList: [],
        list: [],
        show: true
      }
    },
    watch: {
      current: {
        handler (nv) {
          this.$store.commit('app/setTitle', nv.title)
        },
        deep: true,
        immediate: true
      }
    },
    created () {
      window.addEventListener('message', e => {
        if (!e.data.status) return

        const { comic, current, chapterList } = e.data.data

        this.comic = comic

        this.current = current

        this.chapterList = chapterList

        this.AnalysisWorker = new AnalysisWorker()

        this.$renderer.on('get_chapter_complete', this.getCharpterComplete)

        this.getCharpter()

        this.$toasted.show('Tips: 图片加载过慢可以右键刷新它哦')
      })

      window.opener.postMessage('loaded')
    },
    beforeDestroy () {
      this.$renderer.removeAllListeners('get_chapter_complete')
    },
    methods: {
      getCharpterComplete (evt, arg) {
        console.log(evt, arg)
        if (arg.state) {
          this.AnalysisWorker.postMessage([arg.data, arg.type])

          this.AnalysisWorker.onmessage = e => { console.log(e); e.data.state ? this.list = e.data.data : this.$toasted.error(arg.message) }
        } else {
          this.$toasted.error(arg.message)
        }
      },
      async getCharpter () {
        const params = {
          url: this.current.url,
          target: this.current.fromType
        }

        this.$renderer.send('get_chapter', params)
      },
      onPreviousClick () {
        this.show = false

        const index = this.chapterList.findIndex(item => item.url === this.current.url)

        if (index === 0) {
          this.$toasted.show(' ╮(๑•́ ₃•̀๑)╭ 没有上一话啦')

          return
        }

        this.current = Object.assign(this.current, this.chapterList[index - 1])

        this.getCharpter()

        this.show = true
      },
      onNextClick () {
        this.show = false

        const index = this.chapterList.findIndex(item => item.url === this.current.url)

        if (index === this.chapterList.length - 1) {
          this.$toasted.show(' ╮(๑•́ ₃•̀๑)╭ 没有下一话啦')

          return
        }

        this.current = Object.assign(this.current, this.chapterList[index + 1])

        this.getCharpter()

        this.show = true
      },
      onRushClick (url, el) {
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
    // overflow: hidden;

    .item {
      text-align: center;

      span {
        display: block;
      }

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

  .control {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background: rgba(0, 0, 0, .8);
    transition: all linear .5s;
  }

  /deep/ .vm-scrollbar {
    height: calc(100%);
  }

  /deep/ .vm-scrollbar__wrap {
    height: 100%;
    overflow-x: hidden;
  }

  /deep/ .vm-scrollbar__view {
    height: 100%;
  }
</style>