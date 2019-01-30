import Vue from 'vue'
import axios from 'axios'
import museUI from 'muse-ui'

import App from './App'
import router from './router'
import store from './store'

import { ipcRenderer } from 'electron'

import 'muse-ui/dist/muse-ui.css'
import theme from 'muse-ui/lib/theme'
theme.add('theme', {
}, 'light')

theme.use('theme')

Vue.use(museUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.renderer = Vue.prototype.$renderer = ipcRenderer

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
