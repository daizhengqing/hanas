<template lang="pug">
  .container
    .search-container
      div
        div(style="color: rgba(255,255,255,.8); font-size: 17px; margin-bottom: 30px;") 些许的勇气即是真正的魔法
        mu-text-field(
          type="text" action-icon="search" v-model="keyword" 
          placeholder="快乐的记忆与流过的眼泪，正是因为有大家在这些才有意义"
          :action-click="onSearch"
          @keydown.enter.native="onSearch"
        )
</template>

<script>
  // import { urlEncode } from '@/utils/index'

  export default {
    name: 'home',
    data () {
      return {
        keyword: ''
      }
    },
    methods: {
      async onSearch () {
        if (this.keyword === '') return

        this.$router.push(`/search?keyword=${this.keyword}`)

        // const big5Keyword = await urlEncode(this.keyword, 'big5')

        // const params = {
        //   utf8Keyword: this.keyword,
        //   big5Keyword,
        //   from: ['dmzj', 'comic8']
        // }

        // this.$store.commit('app/setLoadingState', true)

        // this.$renderer.send('search_comic', params)

        // this.$renderer.once('search_complete', (evt, arg) => {
        //   if (arg.state) {
        //     this.list = arg.data[0]

        //     this.list.length === 0 ? this.$toasted.show('( ´◔ ‸◔`) 没找到你想搜的漫画') : ''
        //   } else {
        //     this.$toasted.error(arg.message)
        //   }

        //   this.$store.commit('app/setLoadingState', false)
        // })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    .search-container {
      text-align: center;
      width: 100%;
      height: 100%;
      transition: top 1s ease;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .mu-input {
      color: rgba(255, 255, 255, .8) !important;
      margin: 0 !important;
      width: 430px !important;
    }

    /deep/ .mu-input-line,  /deep/ .mu-input-focus-line {
      display: none;
    }

    /deep/ .mu-text-field {
      border: 1px solid;
          color: rgba(255,255,255,.7);
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
</style>

