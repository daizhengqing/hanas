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
    methods: {
      onSearch () {
        this.$renderer.send('search-comic', { keyword: this.keyword })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
    position: relative;

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
      font-size: 14px;
      text-align: center;
    }

    /deep/ button {
      color: rgba(255, 255, 255, .9)
    }
  }
</style>

