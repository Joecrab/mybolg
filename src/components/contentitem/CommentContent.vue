<template>
  <div>
      <div v-for="(item, index) in articlesList" :key="index" class="comcon">
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
          <el-button type="primary" size="medium" @click="gotocomment(item)" class="combtn">全部评论</el-button>
          <p class="comtime">
              <span>{{item.post_time | formateDate('yyyy-MM-dd hh:mm:ss')}}</span>
              <span class="comtype">{{item.type}}</span>
          </p>
      </div>
  </div>
</template>

<script>
export default {
    name: 'CommentContent',
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
        gotocomment(data){
            let article = data
            this.$router.push({path: '/admin/commentdetail', query: {article}})
        }
    }
}
</script>

<style>
  .comcon {
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
  .combtn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 30px;
  }
  .comtime {
      font-family: 'icomoon';
      position: absolute;
      bottom: 10px;
      font-size: 14px;
      color: rgb(177, 173, 173);
  }
  .comtype {
      margin-left: 10px;
      color:salmon
  }
</style>