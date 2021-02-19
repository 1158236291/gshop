
import Vue from 'vue'
 import app from './app' 
 import router from './router'
 import store from './store/index'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h=>h(app),
  router,
  store
})
