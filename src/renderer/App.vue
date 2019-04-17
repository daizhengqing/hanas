<template lang="pug">
  #app
    app-header
    #app-layout
      #app-aside
        app-aside
      #app-container
        router-view
</template>

<script>
  import appHeader from './components/Header/index'
  import appAside from './components/Aside'
  export default {
    name: 'hanas',
    components: { appHeader, appAside }
  }
</script>

