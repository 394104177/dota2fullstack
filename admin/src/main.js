import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './styles.scss'
import router from './router'
import './plugins/element.js'
import http from "./axios"

Vue.prototype.$http = http
Vue.use(ElementUI)
console.log(process.env)
Vue.config.productionTip = false
Vue.mixin({
  data(){
      return  {
        token:{'Authorization':localStorage.token}
      }  
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
