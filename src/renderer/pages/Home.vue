<template lang="pug">
  .container(:class="list.length > 0 ? 'show' : ''")
    .search-container
      mu-text-field(type="text" v-model="keyword" placeholder="点击这里输入关键词搜索" @keydown.enter.native="onSearch")
      .search-button(v-show="keyword !== '' || list.length > 0")
        mu-button(flat @click="onSearch") 搜索
      .search-result(v-if="list.length > 0")
        .item(v-for="item in list" :key="item.url")
          .cover-container
            img(v-lazy="`/static/image/logo.png`" :data-cover="item.cover" :data-fromType="item.fromType")
          span {{ item.name }}
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        keyword: '',
        data: {}
      }
    },
    computed: {
      list () {
        if (this.data.response) {
          const res = []

          this.data.response.data.forEach(item => res.push(...item))

          return res
        } else {
          return []
        }
      }
    },
    mounted () {
      this.$Lazyload.$on('loaded', async e => {
        console.log(e)
        const { cover, fromtype } = e.el.dataset

        const res = await this.cover(cover, fromtype)
        console.log(res)
        this.$nextTick(() => {
          e.el.src = res
        })
      })

      console.log(this.$Lazyload)
    },
    methods: {
      async onSearch () {
        if (this.keyword === '') {
          return
        }

        const params = {
          keyword: this.keyword,
          from: ['dmzj']
        }

        this.$store.commit('app/setLoading', true)

        const res = await this.$renderer.sendSync('searchComic', params)

        this.data = res

        this.$store.commit('app/setLoading', false)
      },
      async cover (url, target) {
        console.log(url, target)

        const res = await this.$renderer.sendSync('getCover', { url, target })

        const { data, type } = res.response

        const blob = new Blob([new Uint8Array(data.data)], { type })

        return URL.createObjectURL(blob)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    .search-container {
      text-align: center;
      position: absolute;
      width: 100%;
      top: 30%;
      transition: top 1s ease;
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
    // width: 100%;

    .search-container {
      top: 5% !important;
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
    }

    span {
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
    }
  }
</style>

