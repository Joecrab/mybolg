<template>
  <div id="upArticles">
    <div class="type">
      文章类型：
      <el-select v-model="types" placeholder="请选择文章类型" style="width:200px" @change="changeTag">
              <el-option
                v-for="item in typeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
    </el-select>
    </div>
    <el-input v-model="title" placeholder="文章标题" size="normal" clearable class="title"></el-input>
      <mavon-editor
              ref="updatemd"
              placehodler="请输入文本"
              v-model="content"
              :toolbars="toolbars"
              class="upmdedit"
              @imgAdd="$imgAdd"
              />
        <el-row >
          <el-col :span="16">
            <el-select v-model="tags" multiple placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in tagsoptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button type="primary" size="medium" @click="save">存为草稿</el-button>
          <el-button type="primary" size="medium" @click="publish">发布</el-button>
          <el-button type="danger" size="medium" @click="clear">清空</el-button>
          </el-col>
        </el-row>
  </div>

</template>

<script>
import {uploadImg, updateArticles, getTages} from '../../../network/useToLogin.js'
export default {
    name: 'UpdateArticle',
    data(){
      return {
        aid: '',
        title: '',
        content:"",
        dtags: [],
        stags: [],
        itags: [],
        tags: [],
        types: "",
        tagsoptions: [],
        typeoptions: [
          {
            value: '选项1',
            label: 'daily'
          },
          {
            value: '选项2',
            label: 'study'
          },
          {
            value: '选项3',
            label: 'interest'
          }
        ],
        toolbars: {
          bold: true,
          italic: true,
          header: true,
          underline: true,
          mark: true,
          superscript: true,
          quote: true,
          ol: true,
          link: true,
          imagelink: true,
          help: true,
          code: true,
          subfield: true,
          fullscreen: true,
          readmodel: true,
          undo: true,
          trash: true,
          save: true,
          htmlcode: true,
          navigation: true,
        }
      }
    },
    created(){
      let data = this.$route.query.article
      this.aid = data.a_id
      this.title = data.title
      this.content = data.summary
      this.types = data.type
      this.tags = JSON.parse(data.tags)
      getTages()
      .then(res => {
        this.dtags = res.dtags.map(item => {
          item.value = item.tagcontent;
          item.label = item.tagcontent;
          return item;
        });
        this.stags = res.stags.map(item => {
          item.value = item.tagcontent;
          item.label = item.tagcontent;
          return item;
        });
        this.itags = res.itags.map(item => {
          item.value = item.tagcontent;
          item.label = item.tagcontent;
          return item;
        });
        switch(this.types){
          case 'daily': this.tagsoptions = this.dtags;break;
          case 'study': this.tagsoptions = this.stags;break;
          case 'interest': this.tagsoptions = this.itags;break;
          default: break;
        }
      });
    },
    methods: {
      changeTag(value){
        switch(value){
          case 'daily': this.tagsoptions = this.dtags;break;
          case 'study': this.tagsoptions = this.stags;break;
          case 'interest': this.tagsoptions = this.itags;break;
          default: break;
        }
        this.tags = []
      },

      $imgAdd(pos,$file){
           var formdata = new FormData();
           formdata.append('imgFile', $file);
           uploadImg(formdata)
           .then((res) => {
             console.log(res)
               this.$refs.updatemd.$img2Url(pos, res.url);
           })
      },

      save(){
        if(this.types.length < 1){
          this.$message({
            message: '文章类型不能为空哟~',
            type: 'error'
          })
        }
        else if(this.title.length < 1){
          this.$message({
            message: '标题不能为空哟~',
            type: 'error'
          })
        }
        else if(this.content < 1){
          this.$message({
            message: '内容不能为空哟~',
            type: 'error'
          })
        }
        else if(this.tags.length < 1){
          this.$message({
            message: '标签不能为空哟~',
            type: 'error'
          })
        }
        else {
          let html = this.$refs.updatemd.d_render;
          let time = new Date().getTime();
          let tags = JSON.stringify(this.tags)
          updateArticles(this.aid, this.title, this.content, html, this.types, tags, time, 0)
          .then(res => {
          this.$message({
            message: res.msg,
            type: res.type
            })
            if(res.type == 'success'){
              setTimeout(() => {
                  this.$router.push('/admin/savebox')
              }, 1000)
            }
          })
        }
      },

      publish(){
        if(this.types.length < 1){
          this.$message({
            message: '文章类型不能为空哟~',
            type: 'error'
          })
        }
        else if(this.title.length < 1){
          this.$message({
            message: '标题不能为空哟~',
            type: 'error'
          })
        }
        else if(this.content.length < 1){
          this.$message({
            message: '内容不能为空哟~',
            type: 'error'
          })
        }
        else if(this.tags.length < 1){
          this.$message({
            message: '标签不能为空哟~',
            type: 'error'
          })
        }
        else {
          let html = this.$refs.updatemd.d_render;
          let time = new Date().getTime();
          let tags = JSON.stringify(this.tags)
          updateArticles(this.aid, this.title, this.content, html, this.types, tags, time, 1)
          .then(res => {
          this.$message({
            message: res.msg,
            type: res.type
            })
            if(res.type == 'success'){
              setTimeout(() => {
                  switch(this.types){
                  case 'daily': this.$router.push('/admin/myhome');break;
                  case 'study': this.$router.push('/admin/study');break;
                  case 'interest': this.$router.push('/admin/interest');break;
                  default: break;
                }
              }, 1000)
            }
          })
        }
      },

      clear(){
        this.types = ''
        this.title = ""
        this.content = ""
        this.tags = []
      }
    }
}
</script>

<style>
#upArticles {
  height: 100%;
  width: 100%;
  position: relative;
  
}
.type {
  position: absolute;
  top: 0;
}
.title {
  position: absolute;
  top: 70px;
}
.upmdedit {
  width: 100%;
  height: 400px;
  position: absolute;
  top: 120px;
}

.el-row {
  width: 100%;
    position: absolute;
    top: 530px;
  }
</style>