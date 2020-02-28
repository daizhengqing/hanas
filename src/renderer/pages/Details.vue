<template lang="pug">
  mu-dialog(fullscreen :open.sync="isShow" :overlay="false")
    .title 
      span {{ data.name }}
      //- span.download(@click="isDownload = true") 下载
      span.back(@click="$emit('close'); list = []") 返回
    Scrollbar
      .chapter-list
        .item(v-for="item in list" :key="item.url" @click="onClick(item)")
          span {{ item.title }}
    mu-dialog(fullscreen :open.sync="isDownload" :overlay="false")
      .title
        span 选择要下载的内容
      Scrollbar
        .chapter-list
          .item(v-for="item in list" :key="item.url" @click="onClick(item)")
            mu-checkbox(:value="item" v-model="downloadList" :label="item.title" color="#fff")
</template>

<script>
  import Scrollbar from 'vue-multiple-scrollbar'

  export default {
    name: 'detail',
    props: ['isShow', 'selected'],
    components: { Scrollbar },
    data () {
      return {
        list: [],
        isDownload: false,
        downloadList: []
      }
    },
    computed: {
      data () {
        return this.selected || {}
      }
    },
    watch: {
      isShow (nv, ov) {
        if (!nv) return

        this.getList()
      }
    },
    methods: {
      async getList () {
        const { fromType: target, url } = this.data

        this.$renderer.send('get_list', {
          target, url
        })

        this.$renderer.once('get_list_complete', (evt, arg) => {
          if (arg.state) {
            this.list = arg.data.map(item => { return { ...item, fromType: target } })

            if (this.list.length === 0) this.$toasted.show('(/= _ =)/~┴┴ 看上去没有可以阅读的章节呢')
          } else {
            this.$toasted.error(arg.message)
          }
        })
      },
      onClick (item) {
        const data = { ...item, list: this.list }

        this.$store.commit('app/setReadingState', true)
        this.$store.commit('app/setCurrentReading', data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .mu-dialog {
    background: rgba(0,0,0,.9);
    font-family: fzzy;
    text-align: center;

    .mu-dialog-body {
      height: 100%;
    }

    /deep/ .vm-scrollbar {
      height: calc(100% - 36px);
    }
  }

  .title {
    line-height: 40px;
    position: relative;
  }

  .title, .chapter-list {
    color: #fff;
  }

  .back, .download {
    position: absolute;
    font-size: 12px;
    cursor: pointer;
  }

  .back {
    right: 20px;
  }

  .download {
    right: 50px;
  }

  .chapter-list  {
    display: grid;
    grid-gap: 0;
    grid-template-columns: repeat(auto-fill, minmax(150px,1fr));
    padding: 0 5%;
  }

  .item {
    margin: 10px;
    line-height: 52px;
    font-size: 14px;
    
    span:hover {
      cursor: pointer;
      border-bottom: 1px solid;
    }
  }
</style>