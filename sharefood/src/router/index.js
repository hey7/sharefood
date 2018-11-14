import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index/index.vue'
import aa from '../components/loginregister/loginregister.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: index
    },
    {
      path: '/login',
      component: aa
    },
    {
      path: '/register',
      component: aa
    }
  ]
})
