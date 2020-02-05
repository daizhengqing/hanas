<template lang="pug">
  #app
    AppHeader
      div(slot="left") HANAs
      div(slot="center") {{ $route.name }}
    #app-layout
      #app-aside
        AppAside
      #app-container
        RouterView
    AppLoading
    Reading(v-if="isReading")
</template>

<script>
  import AppHeader from './components/Header/index'
  import AppAside from './components/Aside'
  import AppLoading from './components/Loading'
  import Reading from './components/Reading'
  export default {
    name: 'hanas',
    components: { AppHeader, AppAside, AppLoading, Reading },
    computed: {
      isReading () {
        return this.$store.state.app.reading
      }
    }
  }
</script>

