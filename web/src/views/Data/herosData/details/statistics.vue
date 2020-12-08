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
    <div v-dht-loading.fullscreen="!show?{background:'white',fontSize :12}:false"></div>
  
      <div v-if="show">
        <dataSkill :datas="itemList ? itemList.addSkills.all.all[0] : null">
        </dataSkill>
      </div>


 
      <data-list v-show="show" v-if="itemList" :datas="itemList.itemData" >
        <data-coloum
          thing="items"
          label="装备"
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


 
      <div style="position: relative"  v-show="show"  >
        <h1 class="title-hori" @click="jumpto('opponents')">
          <span style="font-size: 14px; font-weight: 500">
            最克制{{ singelHero ? singelHero.name : "" }}的对手</span
          >
          <span style="float: right; margin-right: 40px">more</span>
        </h1>

        <data-list
    
          v-if="itemList"
          :datas="
            itemList.OpponentsAndTeammates.opp.all.all.filter((i, k) => {
              return k <= 4;
            })
          "
        >
          <data-coloum label="英雄" prop="hero.name" width="20%"></data-coloum>
          <data-coloum label="头像" prop="hero.icon" width="20%">
            <template v-slot="slotProps">
              <img
                :src="slotProps.item"
                alt="英雄头像"
                style="width: 60px !important; height: 30px; margin-top: 5px"
              />
            </template>
          </data-coloum>
          <data-coloum
            label="使用次数"
            prop="playeds"
            width="30%"
          ></data-coloum>
          <data-coloum label="胜率" prop="winRates" width="30%"></data-coloum>
          <data-coloum
            label="克制指数"
            prop="antiRate"
            width="30%"
          ></data-coloum>
        </data-list>
      </div>
 

  
      <div style="position: relative"  v-show="show" >
        <h1 class="title-hori" @click="jumpto('opponents')">
          <span style="font-size: 14px; font-weight: 500">
            {{ singelHero ? singelHero.name : "" }}最克制的对手</span
          >
          <span style="float: right; margin-right: 40px">more</span>
        </h1>

        <data-list
          v-show="show"
          v-if="itemList"
          :datas="
            itemList.OpponentsAndTeammates.opp.all.all.filter((i, k) => {
              return k > 4;
            })
          "
        >
          <data-coloum label="英雄" prop="hero.name" width="20%"></data-coloum>
          <data-coloum label="头像" prop="hero.icon" width="20%">
            <template v-slot="slotProps">
              <img
                :src="slotProps.item"
                alt="英雄头像"
                style="width: 60px !important; height: 30px; margin-top: 5px"
              />
            </template>
          </data-coloum>
          <data-coloum
            label="使用次数"
            prop="playeds"
            width="30%"
          ></data-coloum>
          <data-coloum label="胜率" prop="winRates" width="30%"></data-coloum>
          <data-coloum
            label="克制指数"
            prop="antiRate"
            width="30%"
          ></data-coloum>
        </data-list>
      </div>
  


      <div style="position: relative"  v-show="show"  >
        <h1 class="title-hori" @click="jumpto('teammates')">
          <span style="font-size: 14px; font-weight: 500">
            最不适合{{ singelHero ? singelHero.name : "" }}的队友</span
          >
          <span style="float: right; margin-right: 40px">more</span>
        </h1>

        <data-list
          v-show="show"
          v-if="itemList"
          :datas="
            itemList.OpponentsAndTeammates.team.all.all.filter((i, k) => {
              return k <= 4;
            })
          "
        >
          <data-coloum label="英雄" prop="hero.name" width="20%"></data-coloum>
          <data-coloum label="头像" prop="hero.icon" width="20%">
            <template v-slot="slotProps">
              <img
                :src="slotProps.item"
                alt="英雄头像"
                style="width: 60px !important; height: 30px; margin-top: 5px"
              />
            </template>
          </data-coloum>
          <data-coloum
            label="使用次数"
            prop="playeds"
            width="30%"
          ></data-coloum>
          <data-coloum label="胜率" prop="winRates" width="30%"></data-coloum>
          <data-coloum
            label="克制指数"
            prop="antiRate"
            width="30%"
          ></data-coloum>
        </data-list>
      </div>
  


      <div style="position: relative; margin-bottom: 100px" v-show="show" >
        <h1 class="title-hori" @click="jumpto('teammates')">
          <span style="font-size: 14px; font-weight: 500">
            最适合{{ singelHero ? singelHero.name : "" }}的队友</span
          >
          <span style="float: right; margin-right: 40px">more</span>
        </h1>

        <data-list
          v-show="show"
          v-if="itemList"
          :datas="
            itemList.OpponentsAndTeammates.team.all.all.filter((i, k) => {
              return k > 4;
            })
          "
        >
          <data-coloum label="英雄" prop="hero.name" width="20%"></data-coloum>
          <data-coloum label="头像" prop="hero.icon" width="20%">
            <template v-slot="slotProps">
              <img
                :src="slotProps.item"
                alt="英雄头像"
                style="width: 60px !important; height: 30px; margin-top: 5px"
              />
            </template>
          </data-coloum>
          <data-coloum
            label="使用次数"
            prop="playeds"
            width="30%"
          ></data-coloum>
          <data-coloum label="胜率" prop="winRates" width="30%"></data-coloum>
          <data-coloum
            label="克制指数"
            prop="antiRate"
            width="30%"
          ></data-coloum>
        </data-list>
      </div>

  </div>
</template>

<script>
 import dataList from '@/layout/datalist.vue'
 import dataColoum from "@/layout/datacoloum.vue";

 import dataSkill from '@/layout/addskill.vue'
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

      dataSkill
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
   
    methods:{
        jumpto(name){
            this.$router.push(`/heros/details/${this.$route.params.id}/${name}`)
        },
        fetchDatas(skill,ladder){
            console.time('a')
               if(!this.singelHero) return
              this.show = false
            this.skill = skill
            this.ladder = ladder
            this.$http.get(`/rest/heroes/statistics/${this.$parent.heroDatas._id}?skill=${skill}&ladder=${ladder}`,{
          
           headers:{
               authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ"
           }
           
       }).then(async res=>{
            console.timeEnd('a')
             const result = res.data
             this.itemList=  result
              this.show = true
              
       })
      
        }
    },
    
    created(){

    this.fetchDatas('all','all')
    },
  
 

}
</script>

<style lang="scss" scoped>


    .itemList{
        img{
            width: 40px !important;
         
        }
    }
     .title-hori {
    position: absolute;
    top: -100px;
    display: table;
    width:  calc(100% - 10px);
    color: rgb(235, 231, 232);
    background-color: rgb(20, 20, 20);
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-weight: 400;
    padding-left: 10px;
    margin-bottom: 15px;
    margin-top: 25px;
    background:  linear-gradient(to right, rgb(20, 20, 20) 0%, rgba(10, 10, 10, 0)  80% );
    text-align: left;
        &:before {
            margin-right: 5px;
            display: inline-block;
            font: normal normal normal 14px/1 'iconfont';
            font-size: inherit;
            text-rendering: auto;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            transform: translate(0, 0);
            content: "\e62f";
            font-size: 14px;
        }
        span:nth-child(2){
            color: #ccc;
            &:before{
                margin-right: 5px;
                display: inline-block;
                content: "\e62c";
                font: normal normal bolder 14px 'iconfont';
                transition: all .2s;
            
            }
             &:hover{
                color: white;
               &:before{
                   transform: rotate(90deg);
               }
            }
           
        }
    }
</style>