<template>
  <div class="newsList">
    <div
      class="newsListBox clear"
      v-for="(item, key) in pageDetails"
      :key="key" @click="pushDetails(item._id)"
    >
      <div class="logo">
        <img :src="item.logo" alt="" />
      </div>
      <div class="articleBox">
        <h1>
          {{ item.title }}
        </h1>
        <p>
          {{ item.subTitle }}
        </p>

        <p class="time">{{ item.addTime.match(/\d{4}-\d{2}-\d{2}/)[0] }}</p>
      </div>
    </div>
    <div class="buttonMore">
      <div class="nav pre">&lt;</div>
      <li class="page" v-for="(item, key) in pageList" :key="key">
        <a @click.prevent="changePage(item)">{{ item }}</a>
      </li>

      <div class="nav next">&gt;</div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            pageList:[1,2,3,4,5,6,7],
            pageDetails:[]
        }
    },
    methods:{
        changePage(page){
          
            const kind = this.$route.params.newType
            console.log(kind)
            if(page>6) {
                 this.pageList= this.pageList.map((item,key)=>{
                  if(key<2) return item
                  return Math.floor((page*2-4)/2)+key-2
                         
            })
            }else{
                this.pageList= [1,2,3,4,5,6,7]
            }
          
            this.fetchPage(page,kind)
        },
        fetchPage(page,kind){
               this.$http.get(`/rest/articles/?page=${page}&kind=${kind}`,{
                    headers:{
                        authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ"
                    }
                }
        ).then(res=>{
           this.pageDetails= res.data
        })
        },
        pushDetails(page){
            console.log('push')
            this.$router.push(`/news/details/${page}`)
        }
    },
    created(){
            this.fetchPage(1, this.$route.params.newType)
    },
     beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // console.log('route',this.$route)
    // this.$route.path = window.decodeURI(to.fullPath) 
    console.log(to)
   
    // console.log( to.fullPath,window.decodeURI(to.fullPath))
    // to.fullPath = window.decodeURI(to.fullPath)
    // window.location.href ='/#'+ window.decodeURI(to.fullPath)
    next()
     this.fetchPage(1, to.params.newType)
    }
}
</script>

<style lang="scss" scoped>
    .newsList{
        font-size: 14px;
        .logo{
            float: left;
            height: 135px;
            overflow: hidden;
            width: 230px;
            img{
                width:100%;
                height: 100%;
            }
        }
        .newsListBox{
            padding: 20px 10px 20px 0px;
             background-color:rgba(238, 238, 238, 0.07);
              height: 135px;
             border-bottom: 1px solid #ebebeb;
            &:hover{
                background-color: #eee;
                h1{
                    color: #379be9;
                }
            }
           
            .articleBox{
                margin-left: 50px;
                float: left;
                width: 560px;
            }
            h1{
            
             color:#404040;
            font-size: 22px;
            line-height: 1.5;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            }
            p{
                  color: #666;
                text-overflow: ellipsis;
                    margin-top: 12px;
                    line-height: 24px;
                max-height: 48px;
                overflow: hidden;
                white-space: pre-wrap;
                &.time{
                    text-align: right;
                }
            }
           
          
        }
         .buttonMore{
                display: table;
                border-spacing: 5px 0;
                margin: 20px auto 0;
                .nav{
                    display: table-cell;
                    vertical-align: middle;
                    width: 35px;
                    height: 35px;
                    border: 1px solid #e8e8e8;
                    background-color: #fff;
                    text-align: center;
                    cursor: pointer;
                   
                }
               
                .page{
                        display: table-cell;
                        vertical-align: middle;
                        width: 35px;
                        height: 35px;
                        border: 1px solid #e8e8e8;
                        background-color: #fff;
                        text-align: center;
                        cursor: pointer;
                     a{
                        background-color: #eee;
                        text-align: center;
                        height: 100%;
                        line-height: 35px;
                        font-size: 18px;
                        border: 1px solid transparent;
                        display: block;
                        transition: all 0.2s ease-in;
                        color: #666;
                        &:hover{
                             color: #379be9;
                             border-color:  #379be9;
                        }
                     }
                 }
            }
    }
</style>
