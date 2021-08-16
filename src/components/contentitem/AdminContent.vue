<template>
  <div id="AdminContent">
      <div v-for="(item, index) in articlesList" :key="index" class="dailycon">
          <h2>
              <span>{{item.title}}</span>
              <el-tag size="mini" 
                      effect="plain"
                      type="warning"
                      v-for="(tag) in tags[index]"
                      :key="tag">
                      {{tag}}
              </el-tag>
          </h2>
          <p class="summary">{{item.summary | changeToSummary(150)}}</p>
          <div class="btn">
              <div>
                  <el-button type="primary" size="medium" @click="editArticle(item)">编辑</el-button>
              </div>
              <div class="btn_del">
                  <el-button type="danger" size="medium" @click="open(item.a_id, index)">删除</el-button>
              </div>
          </div>
          <p class="time">{{item.post_time | formateDate('yyyy-MM-dd hh:mm:ss')}}</p>
      </div>
  </div>
</template>

<script>
import {deleteArticles} from '../../network/useToLogin.js';
export default {
    name: 'AdminContent',
    props: {
        articlesList: {
            type: Array,
            default(){
                return []
            }
        },
        tags: {
            type: Array,
            default(){
                return []
            }
        }
    },
    methods: {
        editArticle(article){
            this.$router.push({path: '/admin/update', query: {article}})
        },

        open(aid, index){
            this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    deleteArticles(aid).then(res => {
                        this.$message({
                            type: res.type,
                            message: res.msg
                            })
                            if(res.type == 'success'){
                                this.$emit('pubRequestAgain')
                            }
                        })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                        });          
                    });
            }
    }
}
</script>

<style>
  .dailycon {
      position: relative;
      height: 110px;
      margin-top: 10px;
      padding: 5px 150px 0 10px;
      border: 1px solid #000000;
      border-radius: 15px;
      background-color: #ffffff;
  }
  .el-tag {
    margin-left: 5px;
  }
  .summary {
      margin-top: 8px;
      word-break: break-all;
      word-wrap: break-word;
  }
  .btn {
      position: absolute;
      top: 14px;
      right: 30px;
  }
  .btn_del {
      margin-top: 10px;
  }
  .time {
      position: absolute;
      bottom: 10px;
      font-size: 14px;
      color: rgb(177, 173, 173);
  }
</style>