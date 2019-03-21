import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {
  Message
} from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      component: () => import('@/view/index/index.vue'),
      redirect: '/index',
    }, {
      path: '/index',
      component: () => import('@/view/index/index.vue'),
    },
    {
      path: '/login',
      component: () => import('@/view/loginRegister/loginRegister.vue'),
    },
    {
      path: '/register',
      component: () => import('@/view/loginRegister/loginRegister.vue'),
    },
    {
      path: '/personalCenter',
      component: () => import('@/view/personalCenter/personalCenter.vue'),
      children: [{
        //菜谱
          path: '/personalCenter/menu',
          component: () => import('@/view/personalCenter/menu/menu.vue'),
        }, {
          path: '/personalCenter/createMenu',
          component: () => import('@/view/personalCenter/menu/createMenu.vue'),
        },
        {
          path: '/personalCenter/editMenu',
          component: () => import('@/view/personalCenter/menu/editMenu.vue'),
        },
        {
          path: '/personalCenter/detailMenu',
          component: () => import('@/view/personalCenter/menu/detailMenu.vue'),
        },
        //账户设置
        {
          path: '/personalCenter/mySetting',
          component: () => import('@/view/personalCenter/mySetting.vue'),
        },
        {
          path: '/personalCenter/aa',
          component: () => import('@/view/personalCenter/comp/aa.vue'),
        } 
      ]
    }
  ],
  linkActiveClass: 'active'
})

//导航守卫
const whiteList = ['/login', '/index', '/register']
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
      Message.warning('请先登录');
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

export default router
