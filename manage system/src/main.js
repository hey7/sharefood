import Vue from 'vue'
import App from './App.vue'
import router from './router' //使用路由
import store from './store' //使用vuex

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import axios from 'axios' //使用axios
axios.defaults.withCredentials = true
Vue.prototype.axios = axios; //因为axios不是全局插件，所以可以添加在vue原型中,使用时：this.axios

import qs from 'qs'; //不用额外安装，axios自带，用于axios.post对数据的处理，处理成：username=1&password=1
Vue.prototype.qs = qs; //因为不是全局插件，所以可以添加在vue原型中,使用时：this.qs

import VueCookies from 'vue-cookies' //使用cookie
Vue.use(VueCookies)

// 引入样式
import '@/assets/css/style.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
