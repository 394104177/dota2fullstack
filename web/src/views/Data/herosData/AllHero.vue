<template>
    <div @click="myclick($event)">
        <data-list :datas="heroDatas" :style="'color:white'">
            <data-coloum  label="英雄" prop="name" width="100"/>
       
            <data-coloum label="头像"  prop="icon" width="400">
                   <template v-slot="slotProps">
                        <img :src="slotProps.item" alt="英雄头像" style="width:60px; height:30px; margin-top:5px" >
                    </template>
           </data-coloum>
            <data-coloum label="胜率"  prop="rate.all.all" width="300"/>
            <data-coloum label="使用次数"  prop="played.all.all" width="300"/>
        
        </data-list>
    </div>
</template>

<script>
import dataList from '@/layout/datalist.vue'
import dataColoum from '@/layout/datacoloum.vue'
export default {
    data:()=>{
        return {
            heroDatas:[]
        }
    },
    components:{
        dataList,
        dataColoum
    },
    methods:{
        myclick(event){
            console.log('hello',event)
        }
    },
    
    created(){
       this.$http.get('/rest/heroes',{
           headers:{
               authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ"
           }
           
       }).then(res=>{
           console.log('created')
           this.heroDatas = res.data
       })
    }
  
}
</script>

<style>

</style>