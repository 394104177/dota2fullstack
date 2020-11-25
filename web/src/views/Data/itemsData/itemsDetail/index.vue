<template>
  <div class="hero">
    <div class="hero_container text-center">
      <main style="min-height: 1000px" class="d-flex">
        <div
          style="
            width: 740px;
            padding: 2px 15px;
            overflow: hidden;
            border-top: 0px;
            position: relative;
          "
        >
          <data-format
            style="height: 200px"
            @changeFormat="fetchDatas"
          ></data-format>
          <data-list :datas="itemDatas">
            <data-coloum label="物品" prop="name" width="20%"></data-coloum>
            <data-coloum label="头像" prop="icon" width="20%">
              <template v-slot="slotProps">
                <img
                  :src="slotProps.item"
                  alt="英雄头像"
                  style="width: 60px; height: 30px; margin-top: 5px"
                />
              </template>
            </data-coloum>
            <data-coloum
              label="使用次数"
              prop="playeds"
              width="30%"
            ></data-coloum>
            <data-coloum label="胜率" prop="winRates" width="30%"></data-coloum>
          </data-list>
        </div>

        <div class="accordion text-white" v-if="singleItem">
          <div class="skill">
            <div
              style="
                font-weight: bold;
                margin-left: 10px;
                margin-top: 10px;
                width: 93%;
                height: 62px;
                line-height: 42px;
                font-size: 16px;
                font-weight: 500;
                
              "
              class="text-left"
            >
              <img
                :src="singleItem.icon"
                style="
                  display: inline-block;
                  vertical-align: middle;
                  margin-right: 15px !important;
                  padding: 2px;
                  width:80px;
                  height:53px
                  
                "
              />
              {{ singleItem.name }}
            </div>
            <div
              style="
                margin-left: auto;
                margin-right: auto;
                padding: 10px;
                line-height: 20px;
              "
              v-html="singleItem.description"
              class="text-left"
            ></div>
          </div>
        </div>
  
      </main>
    </div>
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
            singleItem:null,
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
           
       }).then(async res=>{
           let allhero = await this.$http.get(`/rest/heros/?skill=${skill}&ladder=${ladder}`,{
           headers:{
               authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ"
           }})
           let singleItem = res.data.find(item=>{return item.name === this.$route.params.id})
          console.log(singleItem)
        
            singleItem.played[this.skill][this.ladder].forEach(item=>{ 
                let find = allhero.data.find(i=>{return i._id === item.hero})
                item.name = find.name
                item.icon = find.icon
            })
           this.itemDatas  = singleItem.played[this.skill][this.ladder]
           this.singleItem = singleItem
       })
        }
    },
    
    created(){
    this.fetchDatas('all','all')
    }
    
  
  
}
</script>

<style lang="scss">
.accordion{
    width:360px ;
    box-sizing: border-box;
   
    .skill{
         padding: 5px 20px;
           background-image:linear-gradient(to bottom ,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%);
    }
}
</style>