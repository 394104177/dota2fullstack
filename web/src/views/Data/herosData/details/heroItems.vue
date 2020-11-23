<template>
  <div
    style="
      width: 740px;
      padding: 2px 15px;
      overflow: hidden;
      border-top: 0px;
      position: relative;
    "
  >
    <data-format style="height: 200px" @changeFormat="fetchDatas"></data-format>
    <transition name="fade">
      <div v-show="show">
        <data-list :datas="itemList">
          <data-coloum
            thing="items"
            label="物品"
            prop="name"
            width="20%"
          ></data-coloum>
          <data-coloum thing="items" label="头像" prop="icon" width="20%">
            <template v-slot="slotProps">
              <img
                :src="slotProps.item"
                alt="英雄头像"
                style="width: 60px; height: 30px; margin-top: 5px"
              />
            </template>
          </data-coloum>
          <data-coloum
            thing="items"
            label="使用次数"
            prop="playeds"
            width="30%"
          ></data-coloum>
          <data-coloum
            thing="items"
            label="胜率"
            prop="winRates"
            width="30%"
          ></data-coloum>
        </data-list>
      </div>
    </transition>
  </div>
</template>

<script>
 import dataList from '@/layout/datalist.vue'
 import dataColoum from "@/layout/datacoloum.vue";
 import dataFormat from '@/layout/format.vue'
export default {
    data:()=>{
        return {
            itemList:null,
            show:false
        }
    },
    components:{
    dataList,
    dataColoum,
      dataFormat
    },
    computed:{
        singelHero(){
            return this.$parent?this.$parent.singleHero:null
        }
    },
    watch:{
    'singelHero':function(){
   
        this.fetchDatas('all','all')
    }
    },  
   
    methods:{
     
        fetchDatas(skill,ladder){
            if(!this.singelHero || this.show) return
            this.show = false

            this.skill = skill
            this.ladder = ladder
            this.$http.get(`/rest/heroes/itemRates/${this.$parent.heroDatas._id}?skill=${skill}&ladder=${ladder}`,{
                headers:{
               authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ"
                }
           
            })
            .then(res=>{
             this.itemList = res.data.filter(item=>{ return item})
             this.show = true
            })
     
        }
    },
    
    created(){
    console.log('created')
    this.fetchDatas('all','all')
    },
    mounted(){
        console.log('mounted',this)
    }

}
</script>

<style lang="scss" scoped>
.fade-enter-active  {

      transition: opacity 1s  , width .5s;
     width: 100%;
 
}
.fade-enter  /* .fade-leave-active below version 2.1.8 */ {

        width: 0px;
        opacity: 0;
    
}

.fade-leave-active{
   transition: opacity .5s , width 2s;
    width: 100%;
    opacity: 1;
 
}

.fade-leave-to{
    width: 50%;
   opacity: 0;

}
    .itemList{
        img{
            width: 40px !important;
         
        }
    }
</style>