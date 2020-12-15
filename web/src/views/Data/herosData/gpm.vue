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
            <data-coloum label="经济/分钟"  :prop='`gpm.${skill}.${ladder}`' width="300"/>
            <data-coloum label="经验"  :prop='`xpm.${skill}.${ladder}`' width="300"/>
        
        </data-list>
    </div>
</template>

<script>
import dataList from '@/layout/datalist.vue'
import dataColoum from '@/layout/datacoloum.vue'
import dataFormat from '@/layout/format.vue'
import { mapState } from 'vuex'
export default {
    data:()=>{
        return {
           
            skill:'all',
            ladder:'all'
        }
    },
    components:{
        dataList,
        dataColoum,
        dataFormat
    },
     computed:mapState({
        heroDatas:state=>state.heroDatas
    }),
    methods:{
     
        fetchDatas(skill,ladder){
            this.skill = skill
            this.ladder = ladder
            this.$store.dispatch('getHeroData',{skill,ladder})
      
        }
    },
    
    created(){
    this.fetchDatas('all','all')
    }
  
}
</script>
<style>

</style>