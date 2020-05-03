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
      path: '/search',
      name: 'search',
      component: require('@/pages/Search').default
    },
    {
      path: '/details',
      name: 'details',
      component: require('@/pages/Details').default
    },
    {
      path: '/reading',
      name: 'reading',
      component: require('@/pages/Reading').default
    },
    // {
    //   path: '/bookshelf',
    //   name: '书架',
    //   component: require('@/pages/BookShelf').default
    // },
    // {
    //   path: '/download',
    //   name: '下载',
    //   component: require('@/pages/Download').default
    // },
    {
      path: '/setting',
      name: 'setting',
      component: require('@/pages/Setting').default
    },
    // {
    //   path: '/tray',
    //   name: '托盘',
    //   component: require('@/pages/Tray').default
    // },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
