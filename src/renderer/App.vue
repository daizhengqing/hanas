<template lang="pug">
  #app(:style="style")
    AppHeader
      .header-nav(slot="right" v-if="$route.name !== 'reading'")
        span(@click="$router.push('/')") 首页
        span(@click="$router.push('/bookshelf')") 书架
        span 下载
        span(@click="$router.push('/setting')") 设置
    #app-layout
      #app-container
        router-view
    AppLoading
</template>

<script>
  import AppHeader from './components/Header/index'
  import AppAside from './components/Aside'
  import AppLoading from './components/Loading'

  export default {
    name: 'hanas',

    components: { AppHeader, AppAside, AppLoading },

    computed: {
      bg () {
        return this.$store.state.app.config.bg
      },

      style () {
        if (this.bg) {
          return {
            'background-image': `url('file://${this.bg}')`,
            'background-size': 'cover',
            'background-position': 'unset'
          }
        } else {
          return {
            'background-image': `url(${require('@/assets/image/' + 'bg.jpg')})`
          }
        }
      }
    },

    created () {
      this.$renderer.on('get_config', (evt, arg) => {
        this.$store.commit('app/setConfig', arg)
      })

      this.$renderer.send('get_config')
    }
  }
</script>

<style scoped lang="scss">
  .header-nav span {
    font-size: 14px;
    margin: 0 5px;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid;
    }
  }
</style>

