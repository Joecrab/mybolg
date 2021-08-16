<template>
  <div id="viInterest">
      <tab-header></tab-header>
      <div class="wdefine">
           <h3 class="vititle">兴趣分享</h3>
           <visit-content :articlesList="artList" :tags="tags"></visit-content>
           <el-pagination
           background
           layout="prev, pager, next"
           :total="sumPage"
           :page-size="10"
           class="vipag"
           @current-change="handleCurrentChange">
           </el-pagination>
      </div>
      <aside-link  class="alink"></aside-link>
      <el-backtop :bottom="100" :right="200">
    <div
      style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
    >
      UP
    </div>
  </el-backtop>
  </div>
</template>

<script>
import TabHeader from './childConponent/TabHeader.vue'
import VisitContent from '../../components/contentitem/VisitContent.vue'
import AsideLink from './childConponent/AsideLink.vue'
import {getPublishArticle} from '../../network/useToLogin.js'
export default {
    name: "ViInterest",
    components: {
        TabHeader,
        VisitContent,
        AsideLink
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
      this.getArticleData(this.pageNum, this.pageSize);
    },
    methods: {
      getArticleData(pageNum, pageSize){
        getPublishArticle(pageNum, pageSize, 'interest').then(res => {
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
.wdefine {
     width: 1000px;
     margin: 0 auto;
 }
 .vititle {
   width: 90px;
   text-align: center;
    margin: 20px 0 20px 0;
    border: 3px solid rgb(250, 206, 111);
    border-radius: 5px;
  }
  .vipag {
      position: relative;
      display: inline-block;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
  }
</style>