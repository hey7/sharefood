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
      path: '/index', //首页
      component: () => import('@/view/index/index.vue'),
    },
    {
      path: '/login', //登录
      component: () => import('@/view/loginRegister/loginRegister.vue'),
    },
    {
      path: '/register', //注册
      component: () => import('@/view/loginRegister/loginRegister.vue'),
    },
    {
      path: '/menuIndex', //菜谱首页
      component: () => import('@/view/menu/menuIndex.vue'),
    },
    {
      path: '/detailMenu', //菜谱详情
      component: () => import('@/view/menu/detailMenu.vue'),
    },
    {
      path: '/detailIngredient', //食材详情
      component: () => import('@/view/ingredient/detailIngredient.vue'),
    },
    //个人中心
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
        //私信
        {
          path: '/personalCenter/myPrivateLetter',
          component: () => import('../view/personalCenter/myPrivateLetter'),
        },
        //通知
        {
          path: '/personalCenter/myNotice',
          component: () => import('../view/personalCenter/myNotice/myNotice')
        },

        //审核
        {
          path: '/personalCenter/myNotice/checked',
          component: () => import('../view/personalCenter/myNotice/checked')
        },
        //举报
        {
          path: '/personalCenter/myNotice/reports',
          component: () => import('../view/personalCenter/myNotice/reports'),
        },


        //账户设置
        {
          path: '/personalCenter/mySetting',
          component: () => import('@/view/personalCenter/mySetting.vue'),
        },
        //我的收藏
        {
          path: '/personalCenter/myCollection',
          component: () => import('@/view/personalCenter/myCollection.vue'),
        },
        {
          path: '/personalCenter/aa',
          component: () => import('@/view/personalCenter/comp/aa.vue'),
        },

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
      var url = ''
      if (JSON.stringify(to.query) !== '{}') {
        url = url + "?"
        for (var i in to.query) {
          url = url + i + "=" + to.query[i] + "&"
        }
      }
      next(`/login?redirect=${to.path}` + url) // 否则全部重定向到登录页
    }
  }
})

export default router
