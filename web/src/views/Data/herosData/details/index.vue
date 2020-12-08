<template>
  <div class="hero">
    <div class="hero_container text-center">
      <header>
        <ul class="d-flex ai-center">
          <li>
            <router-link :to="`/heros/details/${$route.params.id}/statistics`">
              综合统计</router-link>
          </li>
          <li>
            <router-link :to="`/heros/details/${$route.params.id}/skills`">技能加点</router-link>
          </li>
          <li>
            <router-link :to="`/heros/details/${$route.params.id}/heroitems`">物品</router-link>
          </li>
          <li>
            <router-link :to="`/heros/details/${$route.params.id}/teammates`">队友英雄分析</router-link>
          </li>
          <li>
            <router-link :to="`/heros/details/${$route.params.id}/opponents`">对手英雄分析</router-link>
          </li>
          <li>
            <router-link :to="`/heros/details/${$route.params.id}/trends`">Trends</router-link>
          </li>
        </ul>
      </header>
      <main
        style="min-height: 1000px"
        class="d-flex"
      >

        <router-view></router-view>

        <div
          class="accordion text-white"
          v-if="show"
        >
          <div class="mask"></div>
          <div class="talent">
            <div class="talent_title">天赋树</div>
            <div class="talent_self">
              <div class="talent_text talent_text_left">
                {{ singleHero ? singleHero.talent[0].l : "" }}
              </div>
              <div class="talent_level">10</div>
              <div class="talent_text talent_text_right">
                {{ singleHero ? singleHero.talent[0].r : "" }}
              </div>
            </div>
            <div class="talent_self">
              <div class="talent_text talent_text_left">
                {{ singleHero ? singleHero.talent[1].l : "" }}
              </div>
              <div class="talent_level">15</div>
              <div class="talent_text talent_text_right">
                {{ singleHero ? singleHero.talent[1].r : "" }}
              </div>
            </div>
            <div class="talent_self">
              <div class="talent_text talent_text_left">
                {{ singleHero ? singleHero.talent[2].l : "" }}
              </div>
              <div class="talent_level">20</div>
              <div class="talent_text talent_text_right">
                {{ singleHero ? singleHero.talent[2].r : "" }}
              </div>
            </div>
            <div class="talent_self">
              <div class="talent_text talent_text_left">
                {{ singleHero ? singleHero.talent[3].l : "" }}
              </div>
              <div class="talent_level">25</div>
              <div class="talent_text talent_text_right">
                {{ singleHero ? singleHero.talent[3].r : "" }}
              </div>
            </div>
          </div>
          <div
            class="skill"
            v-for="skills in singleHero.skills"
            :key="skills._id"
          >
            <div style="
                  font-weight: bold;
                  margin-left: 10px;
                  margin-top: 10px;
                  width: 93%;
                  height: 62px;
                  line-height: 42px;
                  font-size: 16px;
                  font-weight: 500;
                ">
              <img
                :src="skills.icon"
                style="
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 15px !important;
                    padding: 2px;
                    width: 45px;
                  "
              />
              {{ skills.name }}
            </div>
            <div
              style="
                  margin-left: auto;
                  margin-right: auto;
                  padding: 10px;
                  line-height: 20px;
                "
              v-html="skills.descrition"
              class="text-left"
            ></div>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<script>

    // import dataList from '@/layout/datalist.vue'
    // import dataColoum from '@/layout/datacoloum.vue'
export default {
    data:()=>{
        return {
            heroDatas:null,
           show:false
        }
    },

 
    computed:{
        singleHero(){
           let res =  this.heroDatas?this.heroDatas:null
            return  res
        }
    },
 
       beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // console.log('route',this.$route)
    // this.$route.path = window.decodeURI(to.fullPath) 
    if(to.params.id!==from.params.id)  this.fetchDatas()
   
    console.log('indexbefore',to,from)
    // console.log( to.fullPath,window.decodeURI(to.fullPath))
    // to.fullPath = window.decodeURI(to.fullPath)
    // window.location.href ='/#'+ window.decodeURI(to.fullPath)
    next()
    },

    methods:{
      fetchSingelDatas(id){
          
            this.$http.get(`/rest/heroes/${id}`,{
           headers:{
               authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ"
           }
           
        }).then(res=>{
         
           this.heroDatas = res.data
           this.show= true
         console.timeEnd('startFetchHero')
        })
      },
        
     fetchDatas(){
          this.show= false
            console.time('startFetchHero')
            this.$http.get(`/rest/heroes`,{
           headers:{
               authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ"
           }
           
       }).then(res=>{
         let hero =   res.data.find(item=>{
           
              return  item.name === this.$route.params.id
           })
     
           this.fetchSingelDatas(hero._id)
       })
     }
    },
    created(){
     console.log('detailCreate')
      this.fetchDatas()
    
    }
  
}

</script>

<style lang="scss" scoped>
.hero_container {
  &.text-center {
    main {
      width: 1100px;
      margin: 0 auto;
      .accordion {
        width: 360px;
        background-color: #000;
        padding: 10px;
        .talent {
          margin: 30px 0px;
        }
        .talent_title {
          font-size: 16px;
          margin: 0 0 20px 0;
          line-height: 16px;
        }
        .talent_self {
          width: 100%;
          margin: 0 0 5px 0;
          position: relative;
        }
        .talent_self:after {
          content: ".";
          display: block;
          height: 0;
          clear: both;
          visibility: hidden;
        }
        .talent_level {
          position: absolute;
          top: 0;
          left: 146px;
          color: #eecc8a;
          text-shadow: 0px 0px 10px rgba(244, 98, 4, 0.8);
          background-color: #0b0e0d;
          font-size: 14px;
          line-height: 38px;
          text-align: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border: 3px solid #3b3b3d;
        }
        .talent_text {
          font-size: 12px;
          line-height: 46px;
          text-align: center;
          width: 142px;
          padding: 0 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          background-color: #0f1113;
          cursor: pointer;
          position: relative;
        }
        .talent_text_left {
          float: left;
          background: linear-gradient(
            to right,
            rgba(26, 26, 26, 1),
            rgba(26, 26, 26, 0)
          );
        }
        .talent_text_right {
          float: right;
          background: linear-gradient(
            to left,
            rgba(26, 26, 26, 1),
            rgba(26, 26, 26, 0)
          );
        }
      }
    }
  }
}
.attribVal {
  color: rgb(251, 184, 41);
  font-size: 12px;
  font-weight: 500;
  margin-right: 5px;
}
.mana {
  font-size: 12px;
}
.cooldown {
  font-size: 12px;
}
.accordion {
  box-sizing: border-box;
  width: 360px;
}
.router-link-exact-active {
  background: linear-gradient(to top, rgb(26, 26, 26) 0%, rgb(35, 35, 35) 41%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s, width 0.5s;
  width: 100%;
  &.mask {
    width: 0;
    height: 0;
    transition: background-color 2s, width 0.5s;
    background-color: blue;
  }
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  width: 0px;
  opacity: 0;
  &.mask {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
}
</style>