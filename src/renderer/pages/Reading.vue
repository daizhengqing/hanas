<template lang="pug">
  .container
    context-menu(ref="ctxMenu")
      context-menu-item(@click="onRushClick") 刷新此图
    Scrollbar(v-if="show")
      .item(v-for="item, index in list")
        img(v-lazy="item" :loading="require('@/assets/image/loading.gif')")
        span(style="color: #fff;") {{ `${index + 1}/${list.length}` }}
    .control
      span {{ title }}
      span(@click="onPreviousClick") 上一话
      span(@click="onNextClick") 下一话
      span(@click="onShowListClick") 列表
      Scrollbar.m-list-cont(v-show="showList")
        .m-list
          .list-item(v-for="item in chapterList" :key="item.title" @click="onChapterSelect(item)")
            span {{ item.title }}
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
      show: true,
      showList: false
    }
  },

  computed: {
    title () {
      return this.$store.state.app.title
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
      if (arg.state) {
        this.AnalysisWorker.postMessage([arg.data, arg.type])

        this.AnalysisWorker.onmessage = e => {
          if (e.data.state) {
            this.show = false

            this.list = e.data.data

            this.$nextTick(() => {
              this.show = true
            })
          } else {
            this.$toasted.error(arg.message)
          }
        }
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

    onChapterSelect (item) {
      this.current = item

      this.getCharpter()

      this.showList = false
    },

    onPreviousClick () {
      const index = this.chapterList.findIndex(
        item => item.url === this.current.url
      )

      if (index === 0) {
        this.$toasted.show(' ╮(๑•́ ₃•̀๑)╭ 没有上一话啦')
        return
      }
      this.current = Object.assign(this.current, this.chapterList[index - 1])

      this.getCharpter()
    },

    onNextClick () {
      const index = this.chapterList.findIndex(
        item => item.url === this.current.url
      )

      if (index === this.chapterList.length - 1) {
        this.$toasted.show(' ╮(๑•́ ₃•̀๑)╭ 没有下一话啦')

        return
      }

      this.current = Object.assign(this.current, this.chapterList[index + 1])

      this.getCharpter()
    },

    onShowListClick () {
      this.showList = !this.showList
    },

    onRushClick (url, el) {}
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
  background: rgba(0, 0, 0, 0.8);
}

.control {
  user-select: none;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: right;
  background: rgba(0, 0, 0, 0.6);

  span:nth-child(1) {
    float: left;
    cursor: unset;
  }

  span {
    color: #fff;
    line-height: 28px;
    font-size: 13px;
    padding: 0 10px;
    cursor: pointer;
  }

  .m-list-cont {
    height: 250px;
    width: 300px;
    position: absolute;
    top: -255px;
    right: 5px;
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.32);
    transition: .5s all linear;
  }

  .m-list {
    display: grid;
    grid-gap: 0;
    grid-template-columns: repeat(auto-fill, minmax(80px, 11fr));

    .list-item {
      color: #fff;
      text-align: center;

      span {
        float: unset;
      }

      & span:hover {
        cursor: pointer;
        border-bottom: 1px solid #fff;
      }
    }
  }
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