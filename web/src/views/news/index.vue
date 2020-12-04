<template>
  <div class="newsBox">
    <div class="newContainer">
      <article>
        <div class="titleBar">你的位置：首页>全部攻略</div>
        <div class="newsLink">
          <ul class="clear">
            <li><router-link to="/news/comNews">综合新闻</router-link></li>
            <li><router-link to="/news/gameNews">官方新闻</router-link></li>
            <li><router-link to="/news/competition">赛事新闻</router-link></li>
            <li><router-link to="/news/gamePost">更新日志</router-link></li>
          </ul>
        </div>
        <router-view></router-view>
      </article>
    </div>
  </div>
</template>

<script>
export default {
      beforeEach(){
        console.log('berforeEach')
   },
  
}
</script>

<style lang="scss" scoped>
    .newsBox{
    
        min-height: 1200px;
        width:100%;
        .newContainer{
            width: 1100px;
            margin:0 auto;
            background-color: rgb(26,26,26);
            padding: 50px 50px;
            article{   
                background-color: #f5f5f5;;
                padding: 80px;
                .titleBar{
                    height: 100px;
                    line-height: 100px;
                    text-align: center;
                }
                .newsLink{
                    margin: 10px auto;
                    font-size: 14px;
                    ul{
                    
                        margin: 0 auto;
                        cursor: pointer;
                        li{
                            float: left;
                            width:25%;
                          
                            box-sizing: border-box;
                            text-align: center;
                        
                            &:hover{
                                    color: #379be9;
                                    border-color: #379be9;
                            }
                            a{
                                width: 100%;
                                display: block;
                                    padding: 5px 0;
                                  border: 1px solid #d9d9d9;
                                &.router-link-exact-active{
                                            color: #379be9;
                                    border-color: #379be9;
                                }
                            
                            }
                           
                        }
                    }
                }
              
            }
        }

    }
</style>
