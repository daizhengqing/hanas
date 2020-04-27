import Vue from 'vue'
import Axios from 'Axios'
import MuseUI from 'muse-ui'
import VueLazyload from 'vue-lazyload'
import Toasted from 'vue-toasted'
import VueContextMenu from '@ddzq789/vue-context-menu'
import VueScroller from 'vue-scroller'

import App from './App'
import router from './router'
import store from './store'

import { ipcRenderer } from 'electron'

import 'muse-ui/dist/muse-ui.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import './assets/index.scss'

Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 2000
})
Vue.use(MuseUI)
Vue.use(VueContextMenu)
Vue.use(VueLazyload, {
  preLoad: 3.5
})
Vue.use(VueScroller)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = Axios
Vue.renderer = Vue.prototype.$renderer = ipcRenderer

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
