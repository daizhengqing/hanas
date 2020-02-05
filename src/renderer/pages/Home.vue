<template lang="pug">
  .container(:class="list.length > 0 ? 'show' : ''")
    .search-container
      mu-text-field(type="text" v-model="keyword" placeholder="点击这里输入关键词搜索" @keydown.enter.native="onSearch")
      .search-button(v-show="keyword !== '' || list.length > 0")
        mu-button(flat @click="onSearch") 搜索
      Scrollbar
        .search-result(v-if="list.length > 0")
          .item(v-for="item in list" :key="item.url" @click="onClick(item)")
            .cover-container
              img(v-lazy="`/static/image/logo.png`" :id="generateId()" :data-cover="item.cover" :data-fromType="item.fromType")
            span {{ item.name }}
    Details(:isShow.sync="isShow" :selected="selected" @close="isShow = false")
</template>

<script>
  import Scrollbar from 'vue-multiple-scrollbar'
  import Details from './Details'
  import shortid from 'shortid'

  export default {
    name: 'home',
    components: { Scrollbar, Details },
    data () {
      return {
        keyword: '',
        list: [],
        isShow: false,
        selected: null,
        store: []
      }
    },
    watch: {
      list (nv, ov) {
        this.store.forEach(item => {
          URL.revokeObjectURL(item)
        })
      }
    },
    mounted () {
      this.$renderer.on('get_image_complete', (evt, arg) => {
        if (arg.state) {
          const { id, data, type } = arg.data

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

      this.$Lazyload.$on('loaded', async e => {
        const { cover, fromtype } = e.el.dataset

        this.getCover(cover, fromtype, e.el.id)
      })
    },
    beforeDestroy () {
      this.$renderer.removeAllListeners('get_image_complete')
    },
    methods: {
      generateId () {
        return shortid.generate()
      },
      onSearch () {
        if (this.keyword === '') {
          return
        }

        const params = {
          keyword: this.keyword,
          from: ['dmzj']
        }

        this.$store.commit('app/setLoadingState', true)

        this.$renderer.send('search_comic', params)

        this.$renderer.once('search_complete', (evt, arg) => {
          if (arg.state) {
            this.list = arg.data[0]

            this.list.length === 0 ? this.$toasted.show('( ´◔ ‸◔`) 没找到你想搜的漫画') : ''
          } else {
            this.$toasted.error(arg.message)
          }

          this.$store.commit('app/setLoadingState', false)
        })
      },
      getCover (url, target, id) {
        this.$renderer.send('get_image', { url, target, id })
      },
      onClick (item) {
        this.isShow = true

        this.selected = item
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    overflow: hidden;

    .search-container {
      text-align: center;
      position: absolute;
      width: 100%;
      top: 30%;
      transition: top 1s ease;
      height: 100%;
    }

    .mu-input {
      color: rgba(255, 255, 255, .8) !important;
      margin: 0 !important;
    }

    /deep/ .mu-input-line {
      background-color: rgba(0,0,0,0);
    }

    /deep/ .mu-input__focus {
      color: rgba(255, 255, 255, .8) !important;
    }

    /deep/ .mu-text-field-input {
      color: rgba(255, 255, 255, .9) !important;
      text-align: center;
      font-size: 15px;
      letter-spacing: 1px;
    }

    /deep/ input::-webkit-input-placeholder {
      color: rgba(255, 255, 255, .9);
      font-size: 13px;
      text-align: center;
    }

    /deep/ button {
      color: rgba(255, 255, 255, .9)
    }
  }

  .show {
    width: 100%;

    .search-container {
      top: 0 !important;
    }

    .search-button, .mu-input, /deep/ .vm-scrollbar__wrap {
      padding-right: 144px;
    }
  }

  .search-result {
    display: grid;
    grid-gap: 0;
    grid-template-columns: repeat(auto-fill, minmax(150px,1fr));

    .item {
      padding: 7px;
    }

    .cover-container {
      height: 192px;
      overflow: hidden;
      margin-bottom: 5px;
      border-radius: 3px;
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
    height: calc(100% - 36px - 48px);
  }

  /deep/ .vm-scrollbar__wrap {
    height: 100%;
    overflow-x: hidden;
  }
</style>

