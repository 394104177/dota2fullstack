<template>
       <div style="position: relative; border: 1px black solid;overflow:hidden;border-top:0px ">
    <data-format
      style="height: 200px"
      @changeFormat="fetchDatas"
    ></data-format>
        <data-list :datas="itemDatas" :style="'color:white'">
            <data-coloum  :thing="'items'" label="英雄" prop="name" width="100"/>
       
            <data-coloum thing="items" label="头像"  prop="icon" width="400">
                   <template v-slot="slotProps">
                        <img :src="slotProps.item" alt="英雄头像" style="width:50px; height:30px; margin-top:5px" >
                    </template>
           </data-coloum>
            <data-coloum thing="items" label="胜率"   :prop='`rate.${skill}.${ladder}`' width="300" show='percent'/>
            <data-coloum thing="items" label="使用次数"   :prop='`played.${skill}.${ladder}`' width="300" show='number'/>
        
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
            itemDatas:[],
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
        
            this.$http.get(`/rest/items/?skill=${skill}&ladder=${ladder}`,{
           headers:{
               authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ"
           }
           
       }).then(res=>{
           console.log('created')
           res.data.map(item=>{
               let reduce = item.played[this.skill][this.ladder].reduce((acc,item)=>{return acc+ parseInt(item.playeds)},0)
               item.played[skill]  = {}
               item.played[skill][ladder]  = reduce
               return item
               
           })
           this.itemDatas = res.data
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