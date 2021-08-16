<template>
  <div class="detailbg">
      <tab-header></tab-header>
      <div class="detail">
          <h1>{{article.title}}</h1>
          <p class="detime">{{article.post_time | formateDate('yyyy-MM-dd hh:mm:ss')}}</p>
          <p v-html="article.html" class="detailcon"></p>
          <div>
              <span class="detype">{{article.type}}</span>
              <span class="tag"></span>
              <el-tag size="mini" 
                      effect="dark"
                      type="warning"
                      v-for="(tag) in tags"
                      :key="tag">
                      {{tag}}
              </el-tag>
          </div>
          <div>
              <el-input
              type="textarea"
              :rows="5"
              placeholder="请发布您的评论"
              v-model="textarea"
              class="decomment">
            </el-input>
            <el-button type="warning" size="small" @click="submitcom" class="combtn">提交</el-button>
          </div>
          <div class="comments">
              <p class="comtitle">评论</p>
              <div v-if="comments.length == 0" class="nocom">
                  暂无评论哟~
              </div>
              <div v-else>
                  <div v-for="(item,index) in comments" :key="item.comid">
                      <commentsbox :comment="item" :repindex="index"></commentsbox>
                  </div>
              </div>
          </div>
      </div>
      <aside-link class="delink"></aside-link>
  </div>
</template>

<script>
import TabHeader from './childConponent/TabHeader.vue'
import Commentsbox from '../../components/commentitem/Commentsbox.vue'
import AsideLink from './childConponent/AsideLink.vue'
import {getComments, insertComments} from '../../network/useToLogin.js'
export default {
    name: "ArticleDetail",
    components: {
        TabHeader,
        Commentsbox,
        AsideLink
    },
    data(){
        return {
            article: {},
            tags: [],
            textarea: '',
            comments: [],
        }
    },
    mounted(){
        this.article = JSON.parse(this.$route.query.article);
        this.tags = JSON.parse(this.article.tags)
        getComments(this.article.a_id).then(res => {
            this.comments = res
        })
    },
    methods: {
        submitcom(){
            if(this.textarea === ''){
                this.$message({
                    type: 'error',
                    message: '评论内容不能为空',
                    showClose: true
                })
            }
            else{
                let com = {}
                com.diyname = `自定义网友${this.comments.length + 1}`
                com.comcontent = this.textarea
                com.comtime = new Date().getTime()
                com.aid = this.article.a_id
                insertComments(com.aid, com.diyname, com.comcontent, com.comtime)
                .then(res => {
                    this.$message({
                        type: res.type,
                        message: res.msg,
                        showClose: true
                    })
                    if(res.type == 'success'){
                        com.comid = res.comid
                        this.comments.unshift(com)
                        this.textarea = ''
                    }
                })
            }
        },
    }
}
</script>

<style>
 .detailbg {
     position: relative;
 }
 .detail {
     font-family: 'icomoon';
     width: 1000px;
     margin: 0 auto;
 }
 .detailcon {
     width: 650px;
     margin: 10px 0 15px 0 ;
     font-size: 16px;
     padding: 15px;
     border-radius: 10px;
     background-color: rgba(253, 239, 199,.5);
     color: #000;
     box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
 }
 .detime {
     font-size: 14px;
 }
 .detype {
      margin-right: 10px;
      color:salmon
 }
 .tag {
     color: orange;
 }
 .el-tag {
     margin-left: 8px;
 }
 .decomment {
     margin-top: 15px;
     width: 400px;
 }
 .combtn {
     margin-left: 20px;
 }
 .comments {
     padding-bottom: 80px;
 }
 .comtitle {
     width: 650px;
     margin: 20px 0;
     font-size: 22px;
     padding-bottom: 5px;
     border-bottom: 1px solid #000;
 }
 .delink {
    position: absolute;
    top: 300px;
    right: 250px;
    padding: 10px 10px;
    border: 2px solid rgba(175, 162, 126, 0.5);
    border-radius: 10px;
  }
</style>