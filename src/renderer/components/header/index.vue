<template lang="pug">
  .app-header
    .header-left
      slot(name="left")
    .header-center
      slot(name="center")
    .header-right
      slot(name="right")
      mu-button.button(v-if="!frame" flat @click="onMinButtonClick")
        mu-icon(value="minimize")
      mu-button.button(v-if="!frame" flat @click="onFullScreenButtonClick")
        mu-icon(:value="!fullScreen ? 'fullscreen' : 'fullscreen_exit'")
      mu-button.button(v-if="!frame" flat @click="onCloseButtonClick")
        mu-icon(value="close")
</template>

<script>
export default {
  name: 'app-header',
  data () {
    return {
      fullScreen: false
    }
  },
  computed: {
    frame () {
      try { return this.$store.state.app.config.window.frame } catch (err) { return false }
    }
  },
  mounted () {
    this.$renderer.on('maximize_window', (evt, arg) => {
      this.fullScreen = true
    })

    this.$renderer.on('unmaximize_window', (evt, arg) => {
      this.fullScreen = false
    })
  },
  methods: {
    onMinButtonClick () {
      this.$renderer.send('min_window')
    },
    onFullScreenButtonClick () {
      this.fullScreen ? this.$renderer.send('exit_full_window') : this.$renderer.send('full_window')
    },
    onCloseButtonClick () {
      this.$renderer.send('close_window')
    }
  }
}
</script>


<style lang="scss" scoped>
  %no-drag {
    -webkit-app-region: no-drag;
  }

  %inline-block {
    display: inline-block;
    vertical-align: bottom;
  }

  $app-header-height: 36px;
  $app-side-width: 200px;
  $font-color: rgba(255 ,255, 255, .9);

  .app-header {
    -webkit-app-region: drag;
    -webkit-user-select: none;
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;

    & > * {
      @extend %inline-block;
      height: $app-header-height;
      line-height: $app-header-height;
      text-align: center;
      color: $font-color;
    }

    .header-left {
      @extend %no-drag;
      width: $app-side-width;
      text-align: left;
      padding-left: 16px;
      font-size: 17px;
      letter-spacing: 1px;
    }

    .header-center {
      width: calc(100% - #{$app-side-width * 2});
    }

    .header-right {
      width: $app-side-width;
    }

    .button {
      @extend %no-drag;
      min-width: auto;
      color: $font-color;

      i {
        color: $font-color;
      }
    }

    /deep/ .mu-icon {
      font-size: 16px;
    }
  }
</style>

