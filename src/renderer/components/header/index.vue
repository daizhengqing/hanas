<template lang="pug">
  .app-header
    .header-left
      slot(name="left")
    .header-center
      slot(name="center")
    .header-right
      mu-button.button(flat @click="onMinButtonClick")
        i.iconfont.icon-minus
      mu-button.button(flat @click="onFullScreenButtonClick")
        i(:class="['iconfont', !fullScreen ? 'icon-fullscreen' : 'icon-fullscreen-exit']")
      mu-button.button(flat @click="onCloseButtonClick")
        i.iconfont.icon-close
</template>

<script>
export default {
  name: 'app-header',
  data () {
    return {
      fullScreen: false
    }
  },
  mounted () {
    this.$renderer.on('maximize-window', (evt, arg) => {
      this.fullScreen = true
    })

    this.$renderer.on('unmaximize-window', (evt, arg) => {
      this.fullScreen = false
    })
  },
  methods: {
    onMinButtonClick () {
      this.$renderer.send('min-window')
    },
    onFullScreenButtonClick () {
      this.fullScreen ? this.$renderer.send('exit-full-window') : this.$renderer.send('full-window')
    },
    onCloseButtonClick () {
      this.$renderer.send('close-window')
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
  $app-side-width: 144px;
  $font-color: rgba(255 ,255, 255, .9);

  .app-header {
    -webkit-app-region: drag;
    -webkit-user-select: none;

    & > * {
      @extend %inline-block;
      height: $app-header-height;
      line-height: $app-header-height;
      text-align: center;
      color: $font-color;
    }

    .header-left {
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
  }
</style>

