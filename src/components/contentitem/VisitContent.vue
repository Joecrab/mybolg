<template>
  <div id="VisitContent">
      <div v-for="(item, index) in articlesList" :key="index" class="decon">
          <h2>
              <span @click="gotodetail(item)" class="gotitle">{{item.title}}</span>
              <el-tag size="mini" 
                      effect="plain"
                      type="warning"
                      v-for="(tag) in tags[index]"
                      :key="tag">
                      {{tag}}
              </el-tag>
          </h2>
          <p class="summary">{{item.summary | changeToSummary(150)}}</p>
          <p class="time">
              <span>{{item.post_time | formateDate('yyyy-MM-dd hh:mm:ss')}}</span>
              <span class="intype">{{item.type}}</span>
          </p>
      </div>
  </div>
</template>

<script>
export default {
    name: 'VisitContent',
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
        gotodetail(article){
            let data = JSON.stringify(article)
            this.$router.push({path: '/detail', query: {article: data}})
        }
    }
}
</script>

<style>
  .decon {
      position: relative; 
      width: 650px;
      height: 120px;
      margin-top: 15px;
      padding: 10px 0 0 10px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
      border-radius: 15px;
      background-color: rgba(253, 239, 199,.5);
  }
  .gotitle {
      cursor: pointer;
  }
  .gotitle:hover {
      color: orange;
      border-bottom: 1px solid #000;
  }
  .el-tag {
    margin-left: 5px;
  }
  .summary {
      margin-top: 10px;
      word-break: break-all;
      word-wrap: break-word;
  }
  .time {
      font-family: 'icomoon';
      position: absolute;
      bottom: 10px;
      font-size: 14px;
      color: rgb(177, 173, 173);
  }
  .intype {
      margin-left: 10px;
      color:salmon
  }
</style>