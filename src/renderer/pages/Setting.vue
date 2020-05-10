<template lang="pug">
  .setting
    .setting-item
      span.setting-item-title 更换背景图片
      button.setting-btn(@click="onChangeBackgroundBtnClick(false, $event)") 选择文件
      button.setting-btn(@click="onChangeBackgroundBtnClick(true, $event)") 恢复默认
      input(ref="bgSelect" type="file" style="display: none;")
    //- .setting-item
    //-   span.setting-item-title 下载路径
    //-   mu-text-field(v-model="dp" disabled solo color="#fff")
    //-   button.setting-btn(@click="onChangeDownloadPathBtnClick(false, $event)") 选择文件夹
    //-   button.setting-btn(@click="onChangeDownloadPathBtnClick(true, $event)") 恢复默认
    //-   input(ref="dpSelect" directory webkitdirectory type="file" style="display: none;")
</template>

<script>
export default {
  computed: {
    dp () {
      return this.$store.state.app.config.dp || ''
    }
  },
  methods: {
    onChangeBackgroundBtnClick (reset, event) {
      if (reset) {
        this.$renderer.send('set_config', {
          key: 'bg',
          val: null
        })

        return
      }

      this.$refs.bgSelect.click()

      this.$refs.bgSelect.onchange = e => {
        console.log(e)

        if (!e.target.files.length) return

        const path = e.target.files[0].path

        this.$renderer.send('set_config', {
          key: 'bg',
          val: path,
          isFilePath: true
        })
      }
    },

    async onChangeDownloadPathBtnClick (reset, event) {
      if (reset) {
        const defaultPath = await this.$renderer.sendSync('get_default_dp')

        console.log(defaultPath)

        this.$renderer.send('set_config', {
          key: 'dp',
          val: defaultPath
        })

        return
      }

      this.$refs.dpSelect.click()

      this.$refs.dpSelect.onchange = e => {
        console.log(e)

        if (!e.target.files.length) return

        const path = e.target.files[0].path

        console.log(path)

        this.$renderer.send('set_config', {
          key: 'dp',
          val: path,
          isFilePath: false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .setting {
    padding-top: 50px;
    color: #fff;
    width: 600px;
    margin: 0 auto;

    &-item {
      text-align: right;
      position: relative;
    }

    &-item-title {
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 3px 0;
    }

    &-btn {
      background: none;
      outline: none;
      color: rgb(255, 255, 255);
      border: none;
      cursor: pointer;

      &:hover {
        color: #a3bcf7;
      }
    }
  }

  /deep/ .mu-input {
    min-height: 26px;
    height: 26px;

    /deep/ input {
      height: 26px;
      text-align: right;
      color: #fff;
      padding-right: 20px;
    }
  }
</style>