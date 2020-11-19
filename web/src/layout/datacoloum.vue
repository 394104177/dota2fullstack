<template>
  <div :style="{ width:countWidth }">
    <div
      style="
        color: white;
        background-color:black;
        height: 30px;
        line-height: 30px;
      "
    >
      {{ label }}
    </div>
    <router-link
      v-for="(item, index) in propdatas"
      :key="index"
      class="itemList"
      :to="`/${thing}/detail/${toUrl[index]}`"
      tag="div"
    >
      <slot :item="item">{{ isPrimitive(item)?item:'' }}</slot>
    </router-link>
  </div>
</template>

<script>
import {isPrimitive} from '../utils/index.js'
export default {
   data:()=>{
       return {
          
       }
   },
   props:{
       'prop':{},
       'label':{},
       'width':{},
        'thing':{
            default:'heros'
        }
   },
    methods:{
        isPrimitive
    },
   computed:{
       propdatas:function(){
 
           return this.$parent.datas? this.$parent.datas.map((item)=>{
               
               let res = item
       
               if(this.prop){
                   this.prop.split('.').forEach(item => {
                      
                       if(res[item]){
                            res = res[item]
                       }else{
                        return 0
                       }
                           
                   });
               }
            
            return res
       }):null
       },

        toUrl:function(){
 
           return this.$parent.datas&&this.$parent.datas.length>0? this.$parent.datas.map((item)=>{
               let res = item.name
               return res
         
           
       }):null},
       countWidth:function(){
     
            if(!this.width){
                return this.$parent.$children.length + '%'
            }
            return this.width.indexOf('%') !== -1  ? this.width : this.width+ 'px'

       }
    
   }
   }
  

</script>

<style lang="scss" scoped>
    .itemList{
        height: 40px;
        line-height: 40px;
        &:nth-child(n){
            background-color:rgb(10,10,10);
        }
        &:nth-child(2n-2){
             background-color: rgb(33,33,33);
        }
    }
</style>