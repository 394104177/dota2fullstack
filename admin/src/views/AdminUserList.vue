<template>
  <div>
      <h1>管理员列表</h1>
      <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="220"/>
        <el-table-column prop="username" label="管理员账号" />
         <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="$router.push(`/admin_users/edit/${scope.row._id}`)">编辑</el-button>
        <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
      
  </div>
</template>

<script>
export default {
    data(){
        return {
            items:[
                
            ]
        }
    },
    methods:{
        async fetch(){
          const res = await  this.$http.get('/rest/admin_users')
        
         this.items =  res.data
        },
        async remove(data){
            this.$confirm(`是否删除${data.name}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await this.$http.delete(`/rest/admin_users/${data._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
            this.fetch()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        }
    },
    created(){
        this.fetch()
    }
}
</script>

<style>

</style>
