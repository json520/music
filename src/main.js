// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'　//引入转义ES6的API语法
import Vue from 'vue'
import App from './App'
import router from './router'

import fastclick from 'fastclick' //引入fastclick
Vue.config.productionTip = false

fastclick.attach(document.body) //设置到body！移动端的300ms延迟消失
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
