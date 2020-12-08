<template>
  <div class="newsList">
    <div class="newsListBox clear">
      <div class="detailArticleBox">

        <div v-html="newDatas" ></div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
    data(){
        return {
           newDatas:''
        }
    },
    methods:{
       fetchPage(page){
               this.$http.get(`/rest/articles/${page}`,{
                    headers:{
                        authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ"
                    }
                }
        ).then(res=>{
           this.newDatas= res.data.body
        })
        }
    },
    created(){
        const page = this.$route.params.page
        this.fetchPage(page)
    
    }
   
}
</script>

<style lang="scss" >
p {
  img {
    max-width: 100%;

  }
}
.detailArticleBox{
    text-align: center;
}
// .newsList {
//   font-size: 14px;

//   .newsListBox {
//     padding: 20px 10px 20px 0px;
//     background-color: rgba(238, 238, 238, 0.07);

//     border-bottom: 1px solid #ebebeb;

//     h1 {
//       color: #404040;
//       font-size: 22px;
//       line-height: 1.5;
//       overflow: hidden;
//       white-space: nowrap;
//       text-overflow: ellipsis;
//     }
//   }
// }
</style>
