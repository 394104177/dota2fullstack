<template>
  <div class="class">
      <h1>{{id?"编辑分类":"创建分类"}}</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
           <el-form-item label="上级分类">
              <el-select v-model="model.parent" >
                  <el-option v-for="item in parentOption"  :key="item._id" :value="item._id" :label="item.name"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="名称">
              <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item >
             <el-button type="primary" native-type="submit">保存</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
    data(){
        return {
            model:{
               name:''
            },
            parentOption:[]
        }
    },
    props:{
        id:{}
    },
    methods:{
       async save(){
           if(this.id){
                await this.$http.put(`rest/categories/${this.id}`,this.model)
           }else{
               await this.$http.post('rest/categories',this.model)
           }

        this.$router.push('/categories/list')
        this.$message({
           type:'success',
           message:'跳转成功'
        })
        },
        async fetch(){
              const res = await  this.$http.get(`rest/categories/${this.id}`)
             this.model =  res.data
        },
        async fetchParentOption(){
              const res = await  this.$http.get(`rest/categories`)

             this.parentOption =  res.data
        }
    },
    created(){
        this.fetchParentOption()
        this.id && this.fetch()
    }
}
</script>

<style>

</style>