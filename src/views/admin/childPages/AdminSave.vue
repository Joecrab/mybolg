<template>
  <div id="adSavebox">
    <h1>saveboxxxxx</h1>
    <div class="w">
      <savebox-content :articlesList="artList" :tags="tags" @requestAgain="delrequest"></savebox-content>
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
import SaveboxContent from '../../../components/contentitem/SaveboxContent.vue';
import {getSavevArticle} from '../../../network/useToLogin.js';
export default {
    name: 'AdminSave',
    components: {
      SaveboxContent
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
        getSavevArticle(pageNum, pageSize).then(res => {
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
      },
      delrequest(){
        if((this.pageNum != 1) && ((this.sumPage - 1) % this.pageSize == 0))
        {
          this.getArticleData(this.pageNum - 1, this.pageSize)
          this.pageNum -= 1
        }
        else{
          this.getArticleData(this.pageNum, this.pageSize)
        }
      }
    }
}
</script>

<style>
#adSavebox {
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