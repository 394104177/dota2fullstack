import axios from "axios"
import vue from 'vue'
import router from './router'
const http = axios.create({
    baseURL:process.env.VUE_APP_api || '/admin/api'
})
http.interceptors.request.use(req=>{

   req.headers.Authorization= localStorage.token
    return req
},err=>{
  console.log(err)
})
http.interceptors.response.use(res=>{
    console.log(res)
    return res
},err=>{
   if(err.response.data.message){
    vue.prototype.$message({
        type:"error",
        message:err.response.data.message
    })
   }
  if(err.response.status===401){
    router.push('/login')
  }
    return  Promise.reject(err)
})

export default http