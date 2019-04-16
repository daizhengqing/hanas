<template lang="pug">
  .aside
    mu-list
      mu-list-item(@click.native="onItemChange('home')")
        mu-list-item-title
          span 首页
          i.iconfont.icon-flower
      mu-list-item(@click.native="onItemChange('bookshelf')")
        mu-list-item-title
          span 书架
          i.iconfont.icon-flower
      mu-list-item(@click.native="onItemChange('download')")
        mu-list-item-title
          span 下载
          i.iconfont.icon-flower
      mu-list-item(@click.native="onItemChange('setting')")
        mu-list-item-title
          span 设置
          i.iconfont.icon-flower
</template>

<script>
export default {
  methods: {
    onItemChange (value) {
      this.$router.push(`/${value}`)
    }
  }
}
</script>


<style lang="scss" scoped>
  @keyframes hanas {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }

  .aside {
    height: 100%;
    user-select: none;

    /deep/ .mu-item {
      height: 32px !important;

      i {
        display: none;
        padding-left: 5px;
        transform-origin: 60% 51%;
        animation: hanas 2s infinite;
      }
    }

    /deep/ .mu-item:hover {
      cursor: pointer;

      i {
        display: inline-block;
      }
    }

    /deep/ .mu-item-title {
      color: rgba(255, 255, 255, 0.9);
    }
  }
</style>
