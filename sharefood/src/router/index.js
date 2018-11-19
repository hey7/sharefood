import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index/index.vue'
import loginRegister from '../components/loginRegister/loginRegister.vue'
import personalCenter from '../components/personalCenter/personalCenter.vue'
import menu from '../components/personalCenter/comp/menu.vue'
import createMenu from '../components/personalCenter/comp/createMenu.vue'
import aa from '../components/personalCenter/comp/aa.vue'

Vue.use(Router)

export default new Router({
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
      children:[{
        path:'menu',
        component:menu
      },{
        path:'createMenu',
        component:createMenu
      },{
        path:'aa',
        component:aa
      }]
    }
  ],
  linkActiveClass:'active'
})
