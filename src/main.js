
import Vue from 'vue'
 import app from './app' 
 import VueLazyload from 'vue-lazyload'
 import router from './router'
 import store from './store/index'
 import {Button} from 'mint-ui'
 import './mock/mockServer'
 import './filters/index'
Vue.config.productionTip = false
Vue.component(Button.name, Button)
Vue.use(VueLazyload)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h=>h(app),
  router,
  store
})
