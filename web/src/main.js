import Vue from 'vue'
import App from './App.vue'
import './utils/prototypeHttp.js'
import './reset.css'
import'./style.scss'
import 'animate.css'
import './assets/font/iconfont.css'
import router from './router'
import maskDirective from '@/components/mask/mask.js'
import store from './store'
// import echarts from 'echarts'
// import {Bus} from '@/utils/eventBus'
Vue.use(maskDirective)
Vue.config.productionTip = false

// Vue.prototype.$echarts = echarts
// Vue.prototype.$bus = Bus
window.myapp = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(process.env)