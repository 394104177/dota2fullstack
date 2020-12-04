<template>
  <div class="firstPage">
    <div v-html="html"></div>
  </div>
</template>

<script>

export default {
    data(){
        return {
            html:null
        }
    },
    created(){
        this.$http.get('/live').then(res=>{
           this.html = res.data
        })
    }

}
</script>

<style lang= "scss">

    .firstPage{
        min-height: 1100px;
        overflow: hidden;
       
    }

    .main-container {
    width: 100%;
    margin: 0px auto 20px auto;
    margin-top: 0px;
    margin-bottom: 1px;
    padding-bottom: 1px;
}

.main-shadow-box {
    width: 100%;
    min-height: 420px;
    font-size: 12px;
}
.maxtopbar {
    margin: 0 auto;
    height: 46px;
    background: #333;
    background: rgba(15, 15, 15, 0.35);
    font-size: 18px;
    width: 100%;
    min-width: 1100px;
}
.container {
    width: 1100px;
    display: table;
    margin: 0 auto;
    color: #ccc;
}
.radius-top {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
}
.live-box {
    box-shadow: 1px 1px 1px #000;
    width: 322px;
    float: left;
    position: relative;
    margin-left: 20px;
    margin-bottom: 20px;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;
    &:hover{
        .play-shadow{
        z-index: 0  !important ;

    img {
        z-index: auto;
    }
}
    }
   
}
.circle-live {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgba(233, 233, 233, .94);
}
.overflow-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.none-opacity-img:focus, .none-opacity-img:hover {
    cursor: pointer;
    filter: alpha(opacity=50);
    -moz-opacity: .5;
    opacity: .5;
    background-color: #000000;
}
.none-opacity-img {
    cursor: pointer;
    filter: alpha(opacity=100);
    -moz-opacity: 1;
    opacity: 1;
    background-color: #000000;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
}
a{

    cursor: pointer;
}


</style>