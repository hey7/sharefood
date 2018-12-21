import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import index from '@/components/index/index.vue'
import loginRegister from '@/components/loginRegister/loginRegister.vue'
import personalCenter from '@/components/personalCenter/personalCenter.vue'
import menu from '@/components/menu/menu.vue'
import createMenu from '@/components/menu/createMenu.vue'
import aa from '@/components/personalCenter/comp/aa.vue'
import detailMenu from '@/components/menu/detailMenu.vue'
import { resolve } from 'path';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index',
      component: index
    },
    {
      path: '/login',
      component: loginRegister
    },
    {
      path: '/register',
      component: loginRegister
    },
    {
      path: '/personalCenter',
      component: personalCenter,
      children:[
        {
          path:'menu',
          component:menu
        },{
          path:'createMenu',
          component:createMenu
        },{
          path:'aa',
          component:aa
        },{
          path:'detailMenu/:menu_id',
          component:detailMenu
        }

      ]
    }
  ],
  linkActiveClass:'active'
})

const whiteList = ['/login', '/index','/register']

router.beforeEach((to, from, next) => {
  console.log('跳转前')
  console.log('vue状态',router.app.$store.getters.islogin,router.app.$store.state.user.islogin)
  if (router.app.$cookies.isKey("username") && router.app.$cookies.isKey("user_id")) {//没过时
    next()
  } else {//cookie过时
    if(router.app.$store.getters.islogin){ //vuex还没同步
      console.log(router.app.$store.getters.islogin,'vuex 同步1')
      store.dispatch("getUser", null); //清空
    }
      
    if (whiteList.indexOf(to.path) !== -1) {  // 在免登录白名单，直接进入
      next()
    } else {
      next('/login?redirect=${to.path}') // 否则全部重定向到登录页
    }
  }

  //参考：
  // if (store.getters.token) {
  //   // 判断是否登录
  //   if (to.path === '/login') {
  //     // 如果是登录页留在登陆页
  //     next()
  //   } else {
  //     if (store.getters.addRouters.length === 0) {
  //       // 判断是否有路由表
  //       api
  //         .getUserInfo({
  //           userId: store.state.user.userId
  //         })
  //         .then(res => {
  //           store.dispatch('Login', res.data[0])
  //           store.dispatch('GenerateRoutes').then(() => {
  //             router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
  //             next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
  //           })
  //         })
  //     } else {
  //       next()
  //     }
  //   }
  // } else {
  //   // 没有登录
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // 在免登录白名单，直接进入
  //     next()
  //   } else {
  //     next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
  //   }
  // }
})

export default router