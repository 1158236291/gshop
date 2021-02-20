
import Vue from 'vue'
 import app from './app' 
 import router from './router'
 import store from './store/index'
 import {Button} from 'mint-ui'
 import './mock/mockServer'
Vue.config.productionTip = false
Vue.component(Button.name, Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h=>h(app),
  router,
  store
})
