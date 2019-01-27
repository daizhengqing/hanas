<template lang="pug">
  .app-header
    .app-name hanas
    .page-title {{$route.name}}
    .app-operation
      mu-button.app-operation-button(flat)
        i.iconfont.icon-minus
      mu-button.app-operation-button(flat)
        i.iconfont.icon-fullscreen
      mu-button.app-operation-button(flat)
        i.iconfont.icon-close
</template>

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

  .app-header {
    -webkit-app-region: drag;
    -webkit-user-select: none;

    & > * {
      @extend %inline-block;
      height: $app-header-height;
      line-height: $app-header-height;
      text-align: center;
    }

    .app-name {
      width: $app-side-width;
      text-align: left;
      padding-left: 20px;
    }

    .page-title {
      width: calc(100% - #{$app-side-width * 2});
    }

    .app-operation {
      width: $app-side-width;

      &-button {
        @extend %no-drag;
        min-width: auto;
      }
    }
  }
</style>

