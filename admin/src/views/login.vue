<template>
  <div class="login-container">
      <el-card class="login-card" header="请先登录">
          <el-form @submit.native.prevent="login">
              <el-form-item label="用户名">
                  <el-input v-model="model.username"></el-input>
              </el-form-item>
               <el-form-item label="密码">
                  <el-input v-model="model.password"></el-input>
              </el-form-item>
               <el-form-item >
                 <el-button type="primary" native-type="submit">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>
<script>
export default {
    data(){
        return {
            model:{}
        }
    },
    methods:{
        async login(){
           let res = await this.$http.post('/login',this.model);
     
          localStorage.setItem('token',res.data.token)
          this.$router.push('/')
        }
    }
}
</script>

<style>
    .login-container{
        width:30rem;
        margin:10rem auto;
    }
</style>