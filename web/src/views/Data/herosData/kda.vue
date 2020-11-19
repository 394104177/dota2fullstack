<template>
       <div style="position: relative; border: 1px black solid;overflow:hidden;border-top:0px ">
           <data-format
      style="height: 200px"
      @changeFormat="fetchDatas"
    ></data-format>
        <data-list :datas="heroDatas" :style="'color:white'">
            <data-coloum  label="英雄" prop="name" width="100"/>
       
            <data-coloum label="头像"  prop="icon" width="400">
                   <template v-slot="slotProps">
                        <img :src="slotProps.item" alt="英雄头像" style="width:60px; height:30px; margin-top:5px" >
                    </template>
           </data-coloum>
            
            <data-coloum label="击杀"   :prop='`kda.${skill}.${ladder}.k`' width="300"/>
            <data-coloum label="死亡"  :prop='`kda.${skill}.${ladder}.d`' width="300"/>
            <data-coloum label="助攻"   :prop='`kda.${skill}.${ladder}.a`' width="300"/>
        
        </data-list>
    </div>
</template>

<script>
import dataList from '@/layout/datalist.vue'
import dataColoum from '@/layout/datacoloum.vue'
import dataFormat from '@/layout/format.vue'
export default {
    data:()=>{
        return {
            heroDatas:[],
            skill:'all',
            ladder:'all'
        }
    },
    components:{
        dataList,
        dataColoum,
        dataFormat
    },
    methods:{
     
        fetchDatas(skill,ladder){
            this.skill = skill
            this.ladder = ladder
        
            this.$http.get(`/rest/heroes/?skill=${skill}&ladder=${ladder}`,{
           headers:{
               authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ"
           }
           
       }).then(res=>{
           console.log('created')
           this.heroDatas = res.data
       })
        }
    },
    
    created(){
    this.fetchDatas('all','all')
    }
  
}
</script>

<style>

</style>