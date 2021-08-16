<template>
  <div class="comdetail">
      <h1>{{article.title}}</h1>
      <p>
          <span class="detime">{{article.post_time | formateDate('yyyy-MM-dd hh:mm:ss')}}</span>
          <span class="comtype">{{article.type}}</span>
      </p>
      <p v-html="article.html" class="detailcon"></p>
      <div>
          <span class="tag"></span>
          <el-tag size="mini" 
                  effect="dark"
                  type="warning"
                  v-for="(tag) in tags"
                  :key="tag">
                  {{tag}}
          </el-tag>
      </div>
      <div class="comments">
          <p class="comtitle">评论</p>
          <div v-if="comments.length == 0" class="nocom">
              暂无评论哟~
          </div>
          <div v-else>
              <div v-for="(item) in comments" :key="item.comid">
                  <admin-commentbox :comment="item" @comdel="comdelete"></admin-commentbox>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

import {getComments} from '../../../network/useToLogin.js'
import AdminCommentbox from '../../../components/commentitem/AdminCommentBox.vue'
export default {
    name: "CommentDetail",
    components: {
        AdminCommentbox
    },
    data(){
        return {
            article: {},
            tags: [],
            comments: [],
        }
    },
    created(){
        this.article = this.$route.query.article;
        this.tags = JSON.parse(this.article.tags)
        getComments(this.article.a_id).then(res => {
            this.comments = res
        })
    },
    methods: {
        comdelete(comment){
            this.comments.splice(this.comments.indexOf(comment), 1)
        }
    }
}
</script>

<style>
  .comdetail {
     font-family: 'icomoon';
     width: 1000px;
     margin: 0 auto;
 }
 .detailcon {
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
 .comtype {
      margin-left: 10px;
      color:salmon
 }
 .tag {
     color: orange;
 }
 .el-tag {
     margin-left: 8px;
 }
 .comments {
     padding-bottom: 80px;
 }
 .comtitle {
     margin: 20px 0;
     font-size: 22px;
     padding-bottom: 5px;
     border-bottom: 1px solid #000;
 }
</style>