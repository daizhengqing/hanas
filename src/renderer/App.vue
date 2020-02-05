<template lang="pug">
  #app
    app-header
    #app-layout
      #app-aside
        app-aside
      #app-container
        router-view
    app-loading
</template>

<script>
  import appHeader from './components/Header/index'
  import appAside from './components/Aside'
  import appLoading from './components/Loading'
  export default {
    name: 'hanas',
    components: { appHeader, appAside, appLoading }
  }
</script>

