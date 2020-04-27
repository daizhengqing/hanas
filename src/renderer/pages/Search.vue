<template lang="pug">
  .search-container
    .nav
      mu-tabs(:value.sync="active" inverse color="rgba(255,255,255,.9)" indicator-color="rgba(255, 255, 255, .8)" center)
        mu-tab(:value="0") 动漫之家
        mu-tab(:value="1") 无限动漫
        mu-tab(:value="2") 虎虎漫画
    .list
      Scrollbar
        .search-result(v-if="list.length > 0")
          .item(v-for="item in list" :key="item.url" @click="onClick(item)")
            .cover-container
              img(v-lazy="item.cover" :loading="require('@/assets/image/loading_cover.png')")
            span {{ item.name }}
</template>

<script>
import Scrollbar from 'vue-multiple-scrollbar'
import DmzjWorker from '../worker/dmzj.worker.js'
import { urlEncode } from '@/utils/index'

export default {
  components: { Scrollbar },
  data () {
    return {
      active: 0,
      isShow: false,
      selected: null,
      list: []
    }
  },
  computed: {
    keyword () {
      return this.$route.query.keyword
    }
  },
  created () {
    this.DmzjWorker = new DmzjWorker()

    this.addListener()

    this.search()
  },
  beforeDestroy () {
    this.$renderer.removeAllListeners('dmzj_search_complete')
  },
  methods: {
    async search () {
      const big5Keyword = await urlEncode(this.keyword, 'big5')

      const params = {
        utf8Keyword: this.keyword,
        big5Keyword,
        from: ['dmzj']
      }

      this.$renderer.send('search_comic', params)
    },
    onClick (item) {
      this.$router.push({ path: '/details', query: item })
    },
    addListener () {
      this.$renderer.on('dmzj_search_complete', this.onDmzjSearchComplete)
    },
    onDmzjSearchComplete (evt, arg) {
      if (arg.state) {
        this.list = arg.data

        this.list.length === 0 ? this.$toasted.show('( ´◔ ‸◔`) 没找到你想搜的漫画') : ''
      } else {
        this.$toasted.error(arg.message)
      }
    }
  }
}
</script>

<style lang="scss">
  .search-container {
    height: 100%;
    padding-top: 50px;

    /deep/ .mu-tabs {
      background: inherit;
      color: rgba(255,255,255,.9);
    }

    .list {
      height: calc(100% - 50px);

      .search-result {
        padding: 30px 20px 10px 20px;
        display: grid;
        grid-gap: 0;
        grid-template-columns: repeat(auto-fill, minmax(150px,1fr));

        .item {
          padding: 7px;
          text-align: center;
        }

        .cover-container {
          height: 192px;
          overflow: hidden;
          margin-bottom: 5px;
          border-radius: 3px;
          background: rgba(0,0,0,.5);
        }

        img {
          width: 100%;
          user-select: none;
          transition: .5s ease;

          &:hover {
            cursor: pointer;
            transform: scale(1.2);
          }
        }

        span {
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
        }
      }

      /deep/ .vm-scrollbar {
        height: 100%;
      }

      /deep/ .vm-scrollbar__wrap {
        height: 100%;
        overflow-x: hidden;
      }
    }
  }
</style>