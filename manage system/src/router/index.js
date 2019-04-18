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
      redirect: '/dashbord',
    }, {
      path: '/index', //首页
      component: () => import('@/views/index/index.vue'),
      children: [
        //概览
        {
          path: '/dashbord',
          component: () => import('@/views/dashbord/dashbord.vue'),
        },
        //用户管理
        {
          path: '/userSettng',
          component: () => import('@/views/userSetting/userSettng.vue'),
        },
        //食材管理
        {
          //展示页
          path: '/ingredientSetting',
          component: () => import('@/views/ingredientSetting/ingredientSetting.vue'),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          //编辑页
          path: '/ingredientSetting/editIngredient',
          component: () => import('@/views/ingredientSetting/editIngredient.vue'),
        },
        {
          //详情页
          path: '/ingredientSetting/detailIngredient',
          component: () => import('@/views/ingredientSetting/detailIngredient.vue'),
        },
        //菜谱管理
        {
          //展示页
          path: '/menuSetting',
          component: () => import('@/views/menuSetting/menuSetting.vue'),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          //详情页
          path: '/menuSetting/detailMenu',
          component: () => import('@/views/menuSetting/detailMenu.vue'),
        },
        {
          //审核页
          path: '/menuSetting/checkMenu',
          component: () => import('@/views/menuSetting/checkMenu.vue'),
        },
        //社区管理
        {
          //展示页
          path: '/communitySetting',
          component: () => import('@/views/communitySetting/communitySetting.vue'),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        //系统设置
        {
          //内容展示页
          path: '/systemSetting/contentDisplay',
          component: () => import('@/views/systemSetting/contentDisplay/contentDisplay.vue'),
        },
        {
          //内容展示页编辑页
          path: '/systemSetting/contentDisplay/editContentDisplay',
          component: () => import('@/views/systemSetting/contentDisplay/editContentDisplay.vue'),
        },
        {
          //字典页
          path: '/systemSetting/dictionary',
          component: () => import('@/views/systemSetting/dictionary/dictionary.vue'),
          meta: {
            keepAlive: true // 需要缓存
          }
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
