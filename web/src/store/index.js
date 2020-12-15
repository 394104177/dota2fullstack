import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      heroDatas:[]
  },
  mutations: {
      setHerosData(state,payload){
       state.heroDatas = payload
      }
  },
  actions: {
      async getHeroData(context,payload){
        console.log(payload)
        const {skill,ladder} = payload
        console.log(skill,ladder)
        const {data} =  await Vue.prototype.$http.get(`/rest/heroes/?skill=${skill}&ladder=${ladder}`,{
            headers:{
                authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ"
            }     
        })
       

       context.commit('setHerosData',data)
      }
  },
  modules: {
  }
})
