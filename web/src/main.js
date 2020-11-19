import Vue from 'vue'
import App from './App.vue'
import './reset.css'
import'./style.scss'
import 'animate.css'
import router from './router'
import axios from "axios"
// import echarts from 'echarts'
// import {Bus} from '@/utils/eventBus'
Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
    baseURL:process.env.VUE_APP_api || '/admin/api'
})
// Vue.prototype.$echarts = echarts
// Vue.prototype.$bus = Bus
window.myapp = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

console.log(process.env)