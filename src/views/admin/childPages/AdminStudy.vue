<template>
  <div id="adStudy">
    <h1>studdy</h1>
    <div class="w">
      <admin-content :articlesList="artList" :tags="tags"></admin-content>
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
import AdminContent from '../../../components/contentitem/AdminContent.vue';
import {getPublishArticle} from '../../../network/useToLogin.js';
export default {
    name: 'AdminStudy',
    data(){
      return {
        artList: [],
        tags: [],
        pageNum: 1,
        pageSize: 4,
        sumPage: 0
      }
    },
    components: {
      AdminContent
    },
    activated(){
      this.getArticleData(this.pageNum, this.pageSize)
    },
    methods: {
      getArticleData(pageNum, pageSize){
        getPublishArticle(pageNum, pageSize, 'study').then(res => {
          this.tags = []
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
#adStudy {
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