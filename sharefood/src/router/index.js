import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/index',
      component: () => import('@/components/index/index.vue'),
    },
    {
      path: '/login',
      component: () => import('@/components/loginRegister/loginRegister.vue'),
    },
    {
      path: '/register',
      component: () => import('@/components/loginRegister/loginRegister.vue'),
    },
    {
      path: '/personalCenter',
      component: () => import('@/components/personalCenter/personalCenter.vue'),
      children: [{
        path: '/personalCenter/menu',
        component: () => import('@/components/menu/menu.vue'),
      }, {
        path: '/personalCenter/createMenu',
        component: () => import('@/components/menu/createMenu.vue'),
      }, {
        path: '/personalCenter/aa',
        component: () => import('@/components/personalCenter/comp/aa.vue'),
      }, {
        path: '/personalCenter/detailMenu',
        component: () => import('@/components/menu/detailMenu.vue'),
      }]
    }
  ],
  linkActiveClass: 'active'
})

const whiteList = ['/login', '/index', '/register']

//以前写的
// console.log('cookie', router.app.$cookies.isKey("username"))
// console.log('vue状态', router.app.$store.getters.islogin, router.app.$store.state.user.islogin)
// store.dispatch("getUser", null); //清空

router.beforeEach((to, from, next) => {
  if (store.getters['user']) { // 判断是否登录
    if (to.path === '/login') { // 如果是登录页留在登陆页
      next()
    } else {
      next()
    }
  } else { // 没有登录
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

export default router
