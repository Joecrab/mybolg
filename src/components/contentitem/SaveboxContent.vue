<template>
  <div id="SaveboxContent">
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
                  <el-button type="success" size="mini" @click="changeArticle(item.a_id, index)">发布</el-button>
              </div>
              <div class="btn_edit">
                  <el-button type="primary" size="mini" @click="editArticle(item)">编辑</el-button>
              </div>
              <div>
                  <el-button type="danger" size="mini" @click="open(item.a_id, index)">删除</el-button>
              </div>
          </div>
          <p class="time">
              <span>{{item.post_time | formateDate('yyyy-MM-dd hh:mm:ss')}}</span>
              <span class="savetype">{{item.type}}</span>
          </p>
      </div>
  </div>
</template>

<script>
import {deleteArticles, changeState} from '../../network/useToLogin.js';
export default {
    name: 'SaveboxContent',
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
        changeArticle(aid, index){
            let time = new Date().getTime();
            changeState(aid, time).then(res => {
                this.$message({
                    type: res.type,
                    message: res.msg
                })
                if(res.type == 'success'){
                    this.$emit('requestAgain')
                }
            })
        },

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
                                this.$emit('requestAgain')
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
      top: 8px;
      right: 30px;
  }
  .btn_edit {
      margin: 5px 0;
  }
  .time {
      font-family: 'icomoon';
      position: absolute;
     bottom: 10px;
      font-size: 14px;
      color: rgb(177, 173, 173);
  }
  .savetype {
      margin-left: 10px;
      color:salmon
  }
</style>