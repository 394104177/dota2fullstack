<template>
        <div style="width:740px;padding:2px 15px;overflow:hidden;border-top:0px;position:relative">
        <data-format
      style="height: 200px"
      @changeFormat="fetchDatas"
    ></data-format>
       <div v-dht-loading.fullscreen="!heroDatas?{fontSize :12}:false"></div>
        <data-list :datas="heroDatas">
            <data-coloum label="英雄" prop="name" width="20%"></data-coloum>
            <data-coloum label="英雄" prop="icon" width="20%">
                <template v-slot="slotProps">
                        <img :src="slotProps.item" alt="英雄头像" style="width:60px; height:30px; margin-top:5px" >
                    </template>
            </data-coloum>
            <data-coloum label="克制指数" prop="antiRate" width="20%"></data-coloum>
            <data-coloum label="胜率" prop="winRates" width="20%"></data-coloum>
            <data-coloum label="使用次数" prop="playeds" width="20%"></data-coloum>
        </data-list>
    </div>
   
</template>

<script>
 import dataList from '@/layout/datalist.vue'
 import dataColoum from "@/layout/datacoloum.vue";
  import dataFormat from '@/layout/format.vue'
export default {
   
    data:()=>{
        return {
            heroDatas:null,
            skill:'all',
            ladder:'all'
        }
    },
    computed:{
        singelHero(){
            return this.$parent?this.$parent.singleHero:1
        }
    },  
    watch:{
    'singelHero':function(){
        this.fetchDatas('all','all')
    }
    },
   
  
    components:{
        dataList,
        dataColoum,
         dataFormat
    },
     methods:{
     
        fetchDatas(skill,ladder){
             if(!this.singelHero) return
            this.skill = skill
            this.ladder = ladder
            console.log(this.singelHero._id)
            this.$http.get(`/rest/heroes/${this.singelHero._id}`,{
            headers:{
               authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ"
           }})
           .then(async res=>{
          
                let firstReq =  await this.$http.get(`/rest/heroes`,{
                    headers:{
                            authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ"
                    }})

               let hero = res.data.OpponentsAndTeammates.opp[this.skill][this.ladder].map(item=>{
              
                        let finded = firstReq.data.find(i=>{return i._id === item.hero})

                        return {    name:finded.name,
                                    antiRate:item.antiRate,
                                  
                                    playeds:item.playeds,
                                    winRates:item.winRates,
                                    icon:finded.icon
                                }
                    })  
                  
                this.heroDatas = hero
            
           
            })
            //  firstReq.data    
        }
    },  

    created(){
    this.fetchDatas('all','all')
    }

}
</script>

<style>

</style>