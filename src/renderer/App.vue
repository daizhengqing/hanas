<template lang="pug">
  #app
    app-header
    #app-layout
      #app-aside
        app-aside
      #app-container
        router-view
</template>

<script>
  import appHeader from './components/Header/index'
  import appAside from './components/Aside'
  export default {
    name: 'hanas',
    components: { appHeader, appAside }
  }
</script>

<style lang="scss">
  @import '/static/icon/iconfont.css';
  @font-face {
    font-family: fzzy;
    src: url('/static/font/FZZHYJW.TTF');
  }

  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    background: url('/static/image/background.jpg');
    background-color: rgba(0, 0, 0, .1);
    background-size: cover;
    background-blend-mode: darken;
    font-family: 'fzzy';
  }

  #app-layout {
    height: calc(100% - 36px);
  }

  #app-aside, #app-container {
    height: 100%;
    display: inline-block;
    vertical-align: bottom;
  }

  $app-aside-width: 144px;

  #app-aside {
    width: $app-aside-width;
  }

  #app-container {
    width: calc(100% - #{$app-aside-width})
  }
</style>

