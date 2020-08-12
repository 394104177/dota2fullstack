<template>
  <div class="class">
      <h1>{{id?"编辑管理员":"创建管理员"}}</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
          <el-form-item label="用户名">
              <el-input v-model="model.username"></el-input>
          </el-form-item>
           <el-form-item label="密码">
              <el-input v-model="model.password" type="text"></el-input>
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
              
            }
          
        }
    },
    props:{
        id:{}
    },
    methods:{
       async save(){
           if(this.id){
                await this.$http.put(`rest/admin_users/${this.id}`,this.model)
           }else{
               await this.$http.post('rest/admin_users',this.model)
           }

        this.$router.push('/admin_users/list')
        this.$message({
           type:'success',
           message:'跳转成功'
        })
        },
        async fetch(){
              const res = await  this.$http.get(`rest/admin_users/${this.id}`)
             this.model =  res.data
        },
    
    },
    created(){
      
        this.id && this.fetch()
    }
}
</script>

<style>
.el-icon-plus.avatar-uploader-icon{
      line-height: 178px;
  }
</style>