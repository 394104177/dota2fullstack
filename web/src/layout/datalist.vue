 

<script>

export default {
    data:()=>{
      return {
       level:1} 
    },
    props:['datas'],
    
    render:function(_c){
        //   console.log('render',this,this.$slots.default[0],this.$slots.default[0].child)
        //    let jsx = <div class="datalist" style="color:white">
        //                 <h{...level} class="list_header"/>
        //              </div>
            let element = _c(
            "div",
           {
               class:[{
                   datalist:true,
                    'd-flex':true,
                    'jc-left':true
               },
               'clc'],
               style:{
                   color:'white'
               }
           },
           [ 
            //  _c('h'+this.level,
            //      {
            //         class:[{
            //          list_header:true
                    
            //          },
            //          'clc'],  
            //         style:{
            //             color:'white'
            //             },
            //         // scopedSlots: {
            //         //         default: props => _c('span', props.label)
            //         // },
            //      },
            //         []
               
            //     ),
             this.$slots.default
            

            ]
        )
        return element
    }
    
  
}
</script>

<style lang="scss" scoped>
    .datalist{
        
         
            margin: 0 auto;
            margin-top: 200px;
    
        .list_header{
            height: 30px;
         
            display: flex;
        }
        .list_main{
           
             width: 1000px;
            
            margin: 0 auto;
        }
    }
</style>