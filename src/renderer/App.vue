<template lang="pug">
  #app
    app-header
    router-view
</template>

<script>
  import appHeader from './components/header/index'
  export default {
    name: 'hanas',
    components: { appHeader }
  }
</script>

<style lang="scss">
  @import '/static/icon/iconfont.css';

  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>

