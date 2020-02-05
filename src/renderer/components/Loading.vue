<template lang="pug">
  .loading(v-show="loading")
    .loading-text ...少女祈祷中
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.state.app.loading
    }
  }
}
</script>

<style lang="scss">
  .loading {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(0, 0, 0, .7);
  }

  .loading-text {
    position: fixed;
    bottom: 0;
    color: #fff;
    right: 0;
    font-size: 18px;
    letter-spacing: 2px;
    padding-right: 10px;
    line-height: 35px;
    animation: color 2s ease infinite;
  }

  @keyframes color {
    0% { opacity: .2; }
    50% { opacity: 1; }
    100% { opacity: .2;}
  }
</style>