<template>
<div >
      <h1 class="title-hori">
        <span style="font-size: 14px;font-weight:500;">技能加点</span>
        <span style="float:right;margin-right:40px;">使用率 {{datas.utilization}}% - 胜率 {{datas.rate}}%</span>
     </h1>
    <table class=" table-shadow" style="border-collapse:collapse">
         <tbody class="text-white text-center">
           <tr v-for="(item,index) in skills" :key="index" style="width:100% ;height:30px !important;">
             <td class="grid" style="height:41px">
                <div><img :src="item.icon" alt="" class="skill-icon"></div>
             </td>
             <td :class="{grid:show(datas.addedLevel[index],k)===k+1+''}" style="border:1px rgb(30, 30, 30) solid;width: 41px;padding:0px;height: 41px; backgroundColor:black" v-for="(i,k) in 19" :key="k">
                <div style="border: 1px rgb(80,80,80) solid;" v-show="!!show(datas.addedLevel[index],k)">{{show(datas.addedLevel[index],k)}}</div>
             </td>
          </tr>
        <tr style="width:100% ;height:30px !important ;">
             <td class="grid" style="height:41px">
                <div><img src="@/assets/talent_bg.jpg" alt="" class="skill-icon"></div>
            </td>
            <td  style="border:1px rgb(30, 30, 30) solid;width: 41px;padding:0px;height: 41px; backgroundColor:black" v-for="(i,k) in 19" :key="k">
                <div  class="grid" style="height:41px;border: 1px rgb(80,80,80) solid;" v-show="datas.addedLevel[datas.addedLevel.length-1][0][k+1]">{{ datas.addedLevel[datas.addedLevel.length-1][0][k+1]? k+1:'' }}</div>
            </td>
        </tr>
     
  
    </tbody>
</table>
</div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:['datas'],
    computed:{
        skills(){
            return this.$parent?this.$parent.singelHero.skills:null
        }
    },
    methods:{
        show(obj,index){
            for (const val of obj) {
                if(val===(index+1)+''){
                    return  val
                }
                
               
            }
            return ''
        }
    }
}
</script>

<style lang="scss">
    .grid{
       
        // border: 1px rgb(80,80,80) solid;
        padding: 0px !important;
        height: 41px;
        line-height: 41px;
        background-color: rgb(25,25,25) !important;
        vertical-align: bottom;
    }

    .title-hori {
    display: table;
    width: 100%;
    color: rgb(235, 231, 232);
    background-color: rgb(20, 20, 20);
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-weight: 400;
    padding-left: 10px;
    margin-bottom: 15px;
    margin-top: 25px;
    background: linear-gradient(toleft, rgba(20, 20, 20, 1) 0%, rgba(10, 10, 10, 0)  70% );
    text-align: left;
        &:before {
            margin-right: 5px;
            display: inline-block;
            font: normal normal normal 14px/1 FontAwesome;
            font-size: inherit;
            text-rendering: auto;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            transform: translate(0, 0);
            content: "\f0c9";
            font-size: 14px;
        }
    }
    .table-shadow{
            box-shadow: 0 3px 19px 6px rgba(0, 0, 0, 0.8);
    }
    .skill-icon {
    display: block;
    height: 41px;
    width: 41px;
    margin: 0px !important;
    padding: 0px !important;
    box-shadow: 0 1px 2px #000;
}

    tr td{
        box-sizing: border-box;
    }
</style>