<template>
  <div id="adComment">
    <h1>commentsss</h1>
    <div class="w">
      <comment-content :articlesList="artList" :tags="tags"></comment-content>
    </div>
    <el-pagination
    background
    layout="prev, pager, next"
    :total="sumPage"
    :page-size="4"
    class="pag"
    @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import CommentContent from '../../../components/contentitem/CommentContent.vue'
import {getAllArticle} from '../../../network/useToLogin.js';
export default {
    name: 'AdminComment',
    components: {
      CommentContent
    },
    data(){
      return {
        artList: [],
        tags: [],
        sumPage: 0,
        pageNum: 1,
        pageSize: 4
      }
    },
    activated(){
      this.getArticleData(this.pageNum, this.pageSize)
    },
    methods: {
      getArticleData(pageNum, pageSize){
        getAllArticle(pageNum, pageSize).then(res => {
          this.tags = []
          this.artList = []
          this.sumPage = res[1][0].count
          this.artList = res[0]
          res[0].forEach(item => {
            this.tags.push(JSON.parse(item.tags))
          });
        })
      },
      handleCurrentChange(val){
        this.getArticleData(val, this.pageSize)
        this.pageNum = val
      }
    }
}
</script>

<style>
#adComment {
  position: relative;
  height: 100%;
  width: 100%;
}
.pag {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
}
</style>