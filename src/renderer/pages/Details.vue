<template lang="pug">
  .details
    .nav
      span(@click="$router.back()") 返回
      span(style="margin-left: 10px;" @click="onCollectBtnClick") {{ hasBook ? '取消收藏' : '收藏到我的书架' }}
      //- span(style="margin-left: 10px; position: relative; display: inline-block;" @click="showDownloadList = !showDownloadList") 下载
        //- Scrollbar.d-list-cont(v-show="true")
        //-   .d-list(v-model="radioGroup")
        //-     .d-list-item(v-for="item in list" :key="item.title")
        //-       mu-checkbox(color="#fff" :value="item" v-model="downloadList" :label="item.title")

    .info
      .info-img
        img(:src="data.cover")
      .info-item 名称：{{ data.name }}
      .info-item 作者：{{ data.author }}
      .info-item 最近：{{ data.last }}
    Scrollbar
      .chapter-list
        .list-item(v-for="item in list" :key="item.title" @click="onItemBtnClick(item)")
          span {{ item.title }}
</template>

<script>
  import Scrollbar from 'vue-multiple-scrollbar'

  export default {
    name: 'detail',

    components: { Scrollbar },

    data () {
      return {
        list: [],
        isDownload: false,
        downloadList: [],
        showDownloadList: false
      }
    },

    computed: {
      data () {
        return this.$route.query
      },

      hasBook () {
        return this.$store.state.app.config.bookShelf
          ? this.$store.state.app.config.bookShelf.find(item => item.fromType === this.data.fromType && item.name === this.data.name)
          : false
      }
    },

    created () {
      this.$renderer.on('get_list_complete', this.onGetListComplete)

      this.getList()
    },

    beforeDestroy () {
      this.$renderer.removeAllListeners('get_list_complete')
    },

    methods: {
      async getList () {
        const { fromType: target, url } = this.data

        this.$renderer.send('get_list', { target, url })
      },

      onGetListComplete (evt, arg) {
        if (arg.state) {
          this.list = Array.from(arg.data, item => { return { ...item, fromType: this.data.fromType } })

          if (this.list.length === 0) this.$toasted.show('(/= _ =)/~┴┴ 看上去没有可以阅读的章节呢')
        } else {
          this.$toasted.error(arg.message)
        }
      },

      onCollectBtnClick () {
        const bookShelf = this.$store.state.app.config.bookShelf || []

        this.hasBook
          ? (() => {
            const index = bookShelf.findIndex(item => item.fromType === this.data.fromType && item.name === this.data.name)

            bookShelf.splice(index, 1)

            this.$toasted.success('已取消收藏')
          })()
          : (() => { bookShelf.push(this.data); this.$toasted.success('收藏成功') })()

        this.$renderer.send('set_config', {
          key: 'bookShelf',
          val: [...bookShelf],
          isFilePath: false
        })
      },

      onItemBtnClick (item) {
        let rw = window.open(`${location.origin}/#/reading`, '_blank')

        const func = () => {
          rw.postMessage({
            status: 1,
            data: { current: item, chapterList: this.list, comic: this.data }
          })

          window.removeEventListener('message', func)
        }

        window.addEventListener('message', func)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .details {
    height: 100%;
    padding-top: 76px;
    display: flex;

    .nav {
      position: absolute;
      color: #fff;
      top: 40px;
      left: 20px;

      & span:hover {
        cursor: pointer;
        border-bottom: 1px solid #fff;
      }
    }
  
    .info {
      width: 240px;

      &-img {
        text-align: center;
        img {
          width: 200px;
          border-radius: 5px;
        }
      }

      &-item {
        color: #fff;
        padding-left: 20px;
        line-height: 36px;
      }
    }

    // .d-list-cont {
    //   position: absolute;
    //   left: 0px;
    //   width: 300px;
    //   height: 240px;
    //   background: rgba(0, 0, 0, .7);
    //   z-index: 999;
    // }

    // .d-list {
    //   display: grid;
    //   grid-gap: 0;
    //   grid-template-columns: repeat(auto-fill, minmax(80px, 11fr));
    //   padding: 10px;
    // }

    // .d-list-item {
    //   text-align: center;
    //   padding: 5px 0;
    // }

    /deep/ .vm-scrollbar {
      flex: 1;
    }

    /deep/ .vm-scrollbar__wrap {
      overflow-x: hidden;
      height: 100%;
    }

    /deep/ .vm-scrollbar__view {
      height: 100%;
    }

    /deep/ .mu-checkbox {
      color: #fff;
    }

    /deep/ .mu-checkbox-label {
      color: #fff;
    }

    .chapter-list {
      height: auto;
      display: grid;
      grid-gap: 0;
      grid-template-columns: repeat(auto-fill, minmax(100px, 11fr));

      .list-item {
        padding-bottom: 20px;
        color: #fff;

        & span:hover {
          cursor: pointer;
          border-bottom: 1px solid #fff;
        }
      }
    }
  }
</style>