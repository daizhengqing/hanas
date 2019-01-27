import Vue from 'vue'
import axios from 'axios'
import museUI from 'muse-ui'

import App from './App'
import router from './router'
import store from './store'

import 'muse-ui/dist/muse-ui.css'

Vue.use(museUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
