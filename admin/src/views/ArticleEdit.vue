<template>
  <div class="class">
      <h1>{{id?"编辑文章":"创建文章"}}</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
           <el-form-item label="所属分类">
              <el-select v-model="model.categories" multiple>
                  <el-option v-for="item in categoriesOption"  
                  :key="item._id" 
                  :value="item._id" 
                  :label="item.name"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="标题">
              <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
              <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
          </el-form-item>
          <el-form-item >
             <el-button type="primary" native-type="submit">保存</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
import {VueEditor} from "vue2-editor"
export default {
    components:{
        VueEditor
    },
    data(){
        return {
            model:{
              
            },
            categoriesOption:[]
        }
    },
    props:{
        id:{}
    },
    methods:{
       async save(){
           if(this.id){
                await this.$http.put(`rest/articles/${this.id}`,this.model)
           }else{
               await this.$http.post('rest/articles',this.model)
           }

        this.$router.push('/articles/list')
        this.$message({
           type:'success',
           message:'跳转成功'
        })
        },
        async fetch(){
              const res = await  this.$http.get(`rest/articles/${this.id}`)
             this.model =  res.data
        },
        async fetchCategories(){
              const res = await  this.$http.get(`rest/categories`)

             this.categoriesOption =  res.data
        },
        async handleImageAdded(file,editor,cursorlocation,resetUploader){
            const data = new FormData()
            data.append('file',file)
            const res = await this.$http.post("upload",data)
            editor.insertEmbed(cursorlocation,'image',res.data.url)
            resetUploader()
        }
    },
    created(){
        this.fetchCategories()
        this.id && this.fetch()
    }
}
</script>

<style>
.el-icon-plus.avatar-uploader-icon{
      line-height: 178px;
  }
</style>