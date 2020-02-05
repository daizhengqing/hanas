<template lang="pug">
  .control
    mu-button.button(flat style="color: #fff;" @click="onPreviousClick")
      i.iconfont.icon-chevron_left
    mu-button.button(flat style="color: #fff;" @click="onNextClick")
      i.iconfont.icon-chevron_right
    //- mu-button.button(flat style="color: #fff;")
    //-   i.iconfont.icon-list
    //- .go-top(@click="$emit('top')") Top
</template>

<script>
  export default {
    name: 'control',
    methods: {
      onPreviousClick () {
        const current = this.$store.state.app.current

        const index = this.$store.state.app.current.list.findIndex(item => item.url === current.url)

        if (index === 0) {
          this.$toasted.show(' ╮(๑•́ ₃•̀๑)╭ 没有上一话啦')

          return
        }

        this.$store.commit('app/setCurrentReading', Object.assign(current, this.$store.state.app.current.list[index - 1]))
      },
      onNextClick () {
        const current = this.$store.state.app.current

        const index = this.$store.state.app.current.list.findIndex(item => item.url === current.url)

        if (index === this.$store.state.app.current.list.length - 1) {
          this.$toasted.show(' ╮(๑•́ ₃•̀๑)╭ 没有下一话啦')

          return
        }

        this.$store.commit('app/setCurrentReading', Object.assign(current, this.$store.state.app.current.list[index + 1]))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .control {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background: rgba(0, 0, 0, .8);
    transition: all linear .5s;
  }

  .go-top {
    width: 50px;
    height: 50px;
    position: absolute;
    top: -60px;
    border-radius: 50%;
    display: flex;
    font-size: 20px;
    align-items: center;
    justify-content: center;
    right: 20px;
    color: #fff;
    background: rgba(103, 176, 179, 0.8);
    cursor: pointer;

    &:hover {
      background: rgba(103, 176, 179, 0.8);
    }
  }
</style>