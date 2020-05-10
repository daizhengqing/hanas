import Vue from 'vue'
import Router from 'vue-router'

/**
 * 重写路由的push方法
 */
// const routerPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return routerPush.call(this, location).catch(error => error)
// }

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
      name: 'setting',
      component: require('@/pages/Setting').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
