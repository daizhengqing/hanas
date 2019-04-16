import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: require('@/pages/Home').default
    },
    {
      path: '/bookshelf',
      name: '书架',
      component: require('@/pages/BookShelf').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
