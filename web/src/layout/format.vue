<template>
  <div class="format d-flex jc-center ai-center" style="position:absolute;top:0" >
    <div class="container d-flex flex-col jc-around" style="height:100px" >
      <div class="d-flex">
        <div class="nabtn-title" >Skills</div>
        <div class="nabtn active" @click="changeFormat('all',null,$event)">全部分段</div>
        <div class="nabtn" style="color:#9c3627;" @click="changeFormat('pro',null,$event)">职业比赛</div>
        <div class="nabtn" style="color:#f0a868;" @click="changeFormat('vh',null,$event)">Very high</div>
        <div class="nabtn" @click="changeFormat('h',null,$event)">High</div>
        <div class="nabtn" style="border-right:1px solid rgb(10,10,10)" @click="changeFormat('n',null,$event)">Normal</div>
      </div>
      <div class="d-flex">
          <div class="nabtn-title" >匹配方式</div>
          <div class="nabtn active" @click="changeFormat(null,'all',$event)">全部比赛</div>
          <div class="nabtn" style="color:#f0a868;" @click="changeFormat(null,'y',$event)">天梯匹配</div>
          <div class="nabtn" style="border-right:1px solid rgb(10,10,10)" @click="changeFormat(null,'n',$event)">普通匹配</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

    data(){
        return {
            skill:'all',
            ladder:'all'
        }
    },
    methods:{
        changeFormat(skill,ladder,event){
            let children = event.target.parentElement.childNodes
            for (let i = 0; i < children.length; i++) {
        
               children[i].classList.remove('active')
                
            }
           event.target.classList.add('active')
           skill= skill?this.skill=skill:this.skill
           ladder=ladder?this.ladder=ladder:this.ladder
            this.$emit('changeFormat',skill,ladder)
        }
    }
}
</script>

<style lang="scss" >
.nabtn-title {
    float: left;
    line-height: 30px;
    width: 80px;
    text-align: right;
    margin-right: 10px;
    font-size: 12px;
    color: white;
}
    .nabtn {
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0));
    text-shadow: 0 1px black;
    padding: 0px 10px;
    min-width: 50px;
    line-height: 27px;
    font-size: 12px;
    font-weight: 500;
    color: #d4d4d4;
    text-align: center;
    border: 1px solid rgb(10,10,10);
    border-right: 0px;
    // border-left: 1px solid #777;
    box-shadow: inset 0 0 0 1px rgba(55, 55, 55, 0.24), inset 0 1px rgba(55, 55, 55, 0.2), inset 0 -1px rgba(0, 0, 0, 0.15), 0 1px 1px rgba(0, 0, 0, 0.2);
    cursor: pointer;
        &:hover{
  
        background-color: rgb(69, 25, 24);
            color: #fff !important;
        }
        
    }

    .active {
    color: #fff !important;
    text-shadow: 0 -1px black;
    background-color: rgb(69, 25, 24);
    border-color: black rgba(0, 0, 0, 0.65) rgba(0, 0, 0, 0.6);
    -webkit-box-shadow: inset 0 1px rgba(0, 0, 0, 0.05), inset 0 2px 2px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.06);
    box-shadow: inset 0 1px rgba(0, 0, 0, 0.05), inset 0 2px 2px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.06);
    }

</style>