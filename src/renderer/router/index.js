import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '主页',
      component: require('@/pages/Home').default
    },
    {
      path: '/bookshelf',
      name: '书架',
      component: require('@/pages/BookShelf').default
    },
    {
      path: '/download',
      name: '下载',
      component: require('@/pages/Download').default
    },
    {
      path: '/setting',
      name: '设置',
      component: require('@/pages/Setting').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
