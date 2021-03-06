// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router' //使用路由

import store from './store' //使用vuex

import ElementUI from 'element-ui'; //使用element-ui组件库
//import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css';
Vue.use(ElementUI)

import axios from 'axios' //使用axios
axios.defaults.withCredentials = true
Vue.prototype.axios = axios; //因为axios不是全局插件，所以可以添加在vue原型中,使用时：this.axios


import qs from 'qs'; //不用额外安装，axios自带，用于axios.post对数据的处理，处理成：username=1&password=1
Vue.prototype.qs = qs; //因为不是全局插件，所以可以添加在vue原型中,使用时：this.qs

import VueCookies from 'vue-cookies' //使用cookie
Vue.use(VueCookies)


// 引入样式
import '../static/css/style.css'


//socket
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
Vue.use(VueSocketio, socketio('http://127.0.0.1:3000/')); 

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
