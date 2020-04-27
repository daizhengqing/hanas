<template lang="pug">
  #app
    AppHeader(:style="{ background: $route.name === 'reading' ? 'rgba(0,0,0,.8)' : '' }")
      .header-nav(slot="left" v-if="$route.name !== 'reading'")
        span(@click="$router.push('/')") 首页
        span 书架
        span 下载
        span 设置
      .header-title(slot="center" v-if="$route.name === 'reading'")
        span {{ title }}
    #app-layout
      #app-container
        router-view
    AppLoading
</template>

<script>
  import AppHeader from './components/Header/index'
  import AppAside from './components/Aside'
  import AppLoading from './components/Loading'
  export default {
    name: 'hanas',
    components: { AppHeader, AppAside, AppLoading },
    computed: {
      title () {
        return this.$store.state.app.title
      }
    }
  }
</script>

<style scoped lang="scss">
  .header-nav span {
    font-size: 14px;
    margin: 0 5px;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid;
    }
  }
</style>

