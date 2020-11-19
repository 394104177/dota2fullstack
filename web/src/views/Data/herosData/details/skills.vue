<template>
    <div style="width:740px;padding:2px 15px;overflow:hidden;border-top:0px;position:relative">
        <data-format  
        style="height: 200px"
        @changeFormat="fetchDatas"></data-format>
        <div  style="position:absolute;top:200px">
            <add-skill  v-for="item in addSkills" :datas='item' :key="item._id"></add-skill>
        </div>
        
    </div>
   
</template>

<script>
import addSkill from '@/layout/addskill.vue'
import dataFormat from '@/layout/format.vue'
export default {
   
    data:()=>{
        return {
            addSkills:null
        }
    },
    computed:{
        singelHero:function(){
         
                console.log('get')
                return this.$parent?this.$parent.singleHero:1
 
        }
            
       
    },
     watch:{
    'singelHero':function(){
        this.fetchDatas('all','all')
    }
    },
    components:{
        addSkill,
        dataFormat
    },
    
  
   methods:{
       fetchDatas(skill,ladder){
           if(!this.singelHero) return
            this.$http.get(`/rest/heroes/${this.singelHero._id}`,{
            
           headers:{
               authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ"
           }
           
       
        }).then(res=>{
           let datas = res.data.addSkills[skill][ladder]
           
           this.addSkills= datas
        })
       }
   },
    created(){
        console.log('skillcreated')
     this.fetchDatas('all','all')
    }

}
</script>

<style>

</style>