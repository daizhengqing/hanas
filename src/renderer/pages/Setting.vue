<template lang="pug">
  .setting
    .setting-item
      span.setting-item-title 更换背景图片
      button.setting-btn(@click="onChangeBackgroundBtnClick(false, $event)") 选择文件
      button.setting-btn(@click="onChangeBackgroundBtnClick(true, $event)") 恢复默认
      input(ref="bgSelect" type="file" style="display: none;")
</template>

<script>
export default {
  methods: {
    onChangeBackgroundBtnClick (reset, event) {
      console.log(reset)

      if (reset) {
        this.$renderer.send('setConfig', {
          key: 'bg',
          val: null
        })

        return
      }

      this.$refs.bgSelect.click()

      this.$refs.bgSelect.onchange = e => {
        console.log(e)

        const path = e.target.files[0].path

        this.$renderer.send('setConfig', {
          key: 'bg',
          val: path,
          isFilePath: true
        })
      }
    }
  }
}
</script>

<style lang="scss">
  .setting {
    padding-top: 50px;
    color: #fff;
    width: 600px;
    margin: 0 auto;

    &-item-title {
      margin-right: 300px
    }

    &-btn {
      background: none;
      outline: none;
      color: rgb(255, 255, 255);
      border: none;
      cursor: pointer;

      &:hover {
        border-bottom: 1px solid #fff;
      }
    }
  }
</style>