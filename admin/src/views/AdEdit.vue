<template>
  <div class="class">
      <h1>{{id?"编辑广告位":"创建广告位"}}</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        
          <el-form-item label="名称">
              <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="广告">
              <el-button type="text" @click="model.items.push({})">
            <i class="el-icon-plus"></i>
            添加广告
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,index) in model.items" :key="index">
              <el-form-item label="跳转链接">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="广告封面" >
                <el-upload
                style="margin-top:0.6rem"
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL+'/upload'"
                  :show-file-list="true"
                  :on-success="res=>{$set(item,'image',res.url) }"
                >
                  <img v-if="item.image" :src="item.image" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item style="text-align:right">
                  <el-button type="danger" @click="model.items.splice(index,1)" style="margin-top:0.6rem">删除广告位</el-button>
              </el-form-item>     
            </el-col>
          </el-row>
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
             items:[]
            }
          
        }
    },
    props:{
        id:{}
    },
    methods:{
       async save(){
           if(this.id){
                await this.$http.put(`rest/ads/${this.id}`,this.model)
           }else{
               await this.$http.post('rest/ads',this.model)
           }

        this.$router.push('/ads/list')
        this.$message({
           type:'success',
           message:'跳转成功'
        })
        },
        async fetch(){
              const res = await  this.$http.get(`rest/ads/${this.id}`)
             this.model =  Object.assign({},this.model,res.data)
        },
    },
    created(){

        this.id && this.fetch()
    }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-icon-plus.avatar-uploader-icon{
      line-height: 178px;
  }
</style>