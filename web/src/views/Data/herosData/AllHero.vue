<template>
  <div class="allhero  ">
     
    <div class="search clear">
      <input type="text" placeholder="搜索英雄" v-model="heroName" />
    </div>
    <div class="container" v-show="heroDatas.length">
       <div class="heroBox clear mt-5">
           <div class="icon"><img src="../../../assets/overviewicon_str.png" alt=""></div>

           <router-link v-for="(item) in heroDatas"  :key="item._id" class="heroCard"  tag="div" :to='toUrl(item.name)'
      
           v-show="item.categories[0].name==='力量英雄'&&item.name.match(heroName)">
               <div class="heroAvatar"><img :src="item.icon" alt=""></div>
               <div class="hero-top-list-bar">
                    <img src="../../../assets/overviewicon_str.png" alt="">
               </div>
               <div class="hero-list-bar">{{item.name}}</div>
           </router-link>
       </div>
       <div class="heroBox clear mt-5">
           <div class="icon"><img src="../../../assets/overviewicon_agi.png" alt=""></div>

           <router-link v-for="(item) in heroDatas"  :key="item._id" class="heroCard"  
                tag="div"  :to='toUrl(item.name)'
           v-show="item.categories[0].name==='敏捷英雄'&&item.name.match(heroName)">
               <div class="heroAvatar"><img :src="item.icon" alt=""></div>
               <div class="hero-top-list-bar">
                    <img src="../../../assets/overviewicon_agi.png" alt="">
               </div>
               <div class="hero-list-bar">{{item.name}}</div>
           </router-link>
       </div>
       <div class="heroBox clear mt-5">
           <div class="icon"><img src="../../../assets/overviewicon_int.png" alt=""></div>

           <router-link v-for="(item) in heroDatas"  :key="item._id" class="heroCard " 
              tag="div"  :to='toUrl(item.name)'
           v-show="item.categories[0].name==='智力英雄'&&item.name.match(heroName)">
               <div class="heroAvatar"><img :src="item.icon" alt=""></div>
               <div class="hero-top-list-bar">
                    <img src="../../../assets/overviewicon_int.png" alt="">
               </div>
               <div class="hero-list-bar">{{item.name}}</div>
           </router-link>
       </div>

    </div>
  </div>
</template>

<script>

export default {
    data:()=>{
        return {
            heroDatas:[],
            heroName:''
        }
    },
    components:{
    
    },
    methods:{
        myclick(event){
            console.log('hello',event)
        },
        toUrl(name){
            return `/heros/details/${name}/statistics`
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

<style lang='scss'>
        .allhero {
            min-height: 1500px;
            // background-color: red;   
            .search{
               padding: 0 10px;
                input{
                    outline-style: none;
                     float: right;
                    margin: 20px 0;
                    width: 300px;
                    height: 30px;
                    border: 2px solid grey;
                    padding-right: 10px;
                    padding-left: 18px;
                    border-radius: 20px;
                }
            }
            .container{
                // background-color: aqua;
                padding: 0 100px;
                .heroBox{
                //    background-color: #fff;
                  .heroCard{
                      float: left;
                      margin: 5px 5px;
                       font-size: 0px;
                      width: 95px;
                      height: 73px;
                      position: relative;
                      background-color:red;
                       .heroAvatar{
                          height: 53px;
                                           font-size: 0px;
                          img{
            
                              box-shadow: 0 1px 2px #000;
                              width: 100%;
                              height: 100%;
                          }
                       }
                       
                      .hero-top-list-bar{
                          position: absolute;
                          top: 5px;
                            height: 20px;
                            img{
                                float: left;
                                margin-left: 5px;;
                                width: 15px;
                            }
                      }
                      .hero-list-bar{
                          width: 100%;
                          height: 20px;
                          line-height: 20px;
                            font-size: 12px;
                           position: absolute;
                           bottom: 0;
                          background-color:#000;
                          color: bisque;
                      }
                   }
                }
            }
        }
</style>