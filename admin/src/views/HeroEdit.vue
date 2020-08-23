<template>
  <div class="class">
    <h1>{{id?"编辑英雄":"新建英雄"}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="second">
        <el-tab-pane label="基础信息" name="first">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top:0.65rem"
              v-model="model.scores.difficult"
              :max="3"
              show-text
              :texts="['简单','一般','困难']"
            ></el-rate>
          </el-form-item>
          <el-form-item label="爆发">
            <el-rate
              style="margin-top:0.65rem"
              v-model="model.scores.attack"
              :max="3"
              show-text
              :texts="['简单','一般','困难']"
            ></el-rate>
          </el-form-item>
          <el-form-item label="灵活">
            <el-rate
              style="margin-top:0.65rem"
              v-model="model.scores.agile"
              :max="3"
              show-text
              :texts="['简单','一般','困难']"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top:0.65rem"
              v-model="model.scores.survive"
              :max="3"
              show-text
              :texts="['简单','一般','困难']"
            ></el-rate>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
                :headers="token"
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="true"
              :on-success="afterUpload"
            >
              <img v-if="model.icon" :src="model.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="推荐出装">
            <el-select v-model="model.items" multiple>
              <el-option v-for="item in items" :key="item._id" :value="item._id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="英雄技巧">
            <el-input type="textarea" v-model="model.tips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息" name="second">
          <el-button type="text" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>
            添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                    drag
                 :header="getAuthorization()"
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL+'/upload'"
                  :show-file-list="true"
                  :on-success="res=>{$set(item,'icon',res.url) }" 
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.descrition" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="danger" @click="model.skills.splice(index,1)">删除技能</el-button>
              </el-form-item>
              
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top:20px">
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
               name:'',
               icon:'',
               scores:{
                  difficult:0,
                  attack:0,
                  agile:0,
                  survive:0
               },
               skills:[]
            },
            categories:[],
            items:[]
           
        }
    },
    props:{
        id:{}
    },
    methods:{
       async save(){
           if(this.id){
                await this.$http.put(`rest/heros/${this.id}`,this.model)
           }else{
               await this.$http.post('rest/heros',this.model)
           }

        this.$router.push('/heroes/list')
        this.$message({
           type:'success',
           message:'跳转成功'
        })
        },
        async fetch(){
              const res = await  this.$http.get(`rest/heroes/${this.id}`)
             this.model =  Object.assign({},this.model,res.data)
        },
        async fetchCategories(){
              const res = await  this.$http.get(`rest/categories`)
             this.categories =  res.data
        },
        async fetchItems(){
              const res = await  this.$http.get(`rest/items`)
             this.items =  res.data
        },
         afterUpload(res){
           this.model.icon = res.url
        },
    
       getAuthorization(){
           return { Authorization:localStorage.token}
       }
   },

       
   
    created(){
        this.fetchCategories()
        this.fetchItems()
        this.id && this.fetch()
    }
}
</script>

<style>
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
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
  .el-icon-plus.avatar-uploader-icon{
      line-height: 178px;
  }
</style>