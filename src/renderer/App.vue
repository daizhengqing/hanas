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
</style>

