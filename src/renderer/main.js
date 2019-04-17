import Vue from 'vue'
import axios from 'axios'
import museUI from 'muse-ui'

import App from './App'
import router from './router'
import Store from './store'

import { ipcRenderer } from 'electron'

import 'muse-ui/dist/muse-ui.css'

import './assets/index.scss'

Vue.use(museUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.store = Vue.prototype.$store = new Store()
Vue.renderer = Vue.prototype.$renderer = ipcRenderer

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
