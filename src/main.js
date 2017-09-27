// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//引入转义ES6的API语法
import 'babel-polyfill'　
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import VueLazyload from 'vue-lazyload'  //图片懒加载---源码了解

import fastclick from 'fastclick' //引入fastclick

import store from './store'
// import 'common/sass/index'
// import '@/common/sass/index.scss'
import '@/common/font2/iconfont.css'
import '@/common/font3/iconfont.css'


Vue.config.productionTip = false

Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: require('@/assets/logo.png'),
  attempt: 1
})


fastclick.attach(document.body) //设置到body！移动端的300ms延迟消失
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
