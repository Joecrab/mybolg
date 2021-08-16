<template>
  <div id="adArticles">
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
              ref="md"
              placehodler="请输入文本"
              v-model="content"
              :toolbars="toolbars"
              class="mdedit"
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
import {uploadImg, addArticles, getTages} from '../../../network/useToLogin.js'
export default {
    name: 'AddArtcles',
    data(){
      return {
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
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          mark: true, // 标记
          superscript: true, // 上角标
          quote: true, // 引用
          ol: true, // 有序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          help: true, // 帮助
          code: true, // code
          subfield: true, // 是否需要分栏
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          undo: true, // 上一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          htmlcode: true, // 展示html源码
          navigation: true, // 导航目录
        }
      }
    },
    /*created(){
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
        this.tagsoptions = this.dtags;
      })
    },*/
    activated(){
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
        // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('imgFile', $file);//$file图片文件名
           uploadImg(formdata)
           .then((res) => {
             console.log(res)
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */
               this.$refs.md.$img2Url(pos, res.url);
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
          let html = this.$refs.md.d_render;
          let time = new Date().getTime();
          let tags = JSON.stringify(this.tags)
          addArticles(this.title, this.content, html, this.types, tags, time, 0)
          .then(res => {
            //0为文章状态，保存了但还没发布，还不能再前台显示
          this.$message({
            message: res.msg,
            type: res.type
            })
            if(res.type == 'success'){
              this.types = ''
              this.title = ""
              this.content = ""
              this.tags = []
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
          let html = this.$refs.md.d_render;
          let time = new Date().getTime();
          let tags = JSON.stringify(this.tags)
          addArticles(this.title, this.content, html, this.types, tags, time, 1)
          .then(res => {
            //0为文章状态，保存了但还没发布，还不能再前台显示
          this.$message({
            message: res.msg,
            type: res.type
            })
            if(res.type == 'success'){
              this.types = ''
              this.title = ""
              this.content = ""
              this.tags = []
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
#adArticles {
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
.mdedit {
  width: 100%;
  height: 400px;/**超坑记得设高度，不然高度随内容变化 */
  position: absolute;
  top: 120px;
}

.el-row {
  width: 100%;
    position: absolute;
    top: 530px;
  }
</style>