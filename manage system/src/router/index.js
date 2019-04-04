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
      component: () => import('@/views/index/index.vue'),
      redirect: '/index',
    }, {
      path: '/index', //首页
      component: () => import('@/views/index/index.vue'),
      children: [{
          //概览
          path: '/overview',
          component: () => import('@/views/overview/overview.vue'),
        },
        //系统设置
        {
          //内容展示页
          path: '/systemSetting/contentDisplay',
          component: () => import('@/views/systemSetting/contentDisplay.vue'),
        },
        {
          //字典页
          path: '/systemSetting/dictionary',
          component: () => import('@/views/systemSetting/dictionary.vue'),
        }
      ]
    },
    {
      path: '/login', //登录
      component: () => import('@/views/loginRegister/login.vue'),
    }

  ],
  linkActiveClass: 'active'
})

//导航守卫
const whiteList = ['/login']
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
