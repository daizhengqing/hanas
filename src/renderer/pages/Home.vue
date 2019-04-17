<template lang="pug">
  .container
    .search-input
      mu-text-field(type="text" v-model="keyword" placeholder="点击这里输入关键词搜索" @keydown.enter.native="onSearch")
      .search-button(v-show="keyword !== ''")
        mu-button(flat @click="onSearch") 搜索
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        keyword: ''
      }
    },
    mounted () {
      this.$renderer.on('search-complete', data => {
        console.log(666666666666666666666, data)
      })
    },
    methods: {
      async onSearch () {
        const params = {
          keyword: this.keyword,
          from: ['dmzj']
        }

        const res = await this.$renderer.sendSync('search-comic', params)

        console.log(res)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: calc(100% - 144px);
    max-width: none;
    height: 100%;
    position: relative;
    padding: 0;
    margin: 0;

    .search-input {
      text-align: center;
      position: absolute;
      width: 100%;
      top: 30%;
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
</style>

