<template>
  <div class="reply_item">
      <div class="repmember">
          <span class="rename">@{{reply.replyname}}</span>
          <span>回复</span>
          <span class="rename">@{{reply.parentname}}</span>
          <span class="commenttime">{{reply.replytime | formateDate('yyyy-MM-dd hh:mm:ss')}}</span>
      </div>
      <p class="recontent">
          {{reply.replycontent}}
      </p>
      <div class="rereplybox">
          <p>
              <span @click="reshowbox" class="replyp">回复</span>
              <span v-show="reisShow" @click="recancel" class="replyp">  取消回复</span>
          </p>
          <div class="replycom" v-show="reisShow">
              <el-input
              type="textarea"
              :rows="3"
              placeholder="请发布您的评论"
              v-model="rereplytext"
              class="decomment">
            </el-input>
            <el-button type="warning" size="small" class="combtn" @click="replycomsubmit">提交</el-button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "Replybox",
    props: {
        reply: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            reisShow: false,
            rereplytext: ''
        }
    },
    methods: {
        reshowbox(){
            this.reisShow = true
        },
        recancel(){
            this.reisShow = false
            this.rereplytext = ''
        },
        replycomsubmit(){
            if(this.rereplytext === ''){
                this.$message({
                    type: 'error',
                    message: '评论内容不能为空',
                    showClose: true
                })
            }
            else{
                let rep = {}
                rep.parentid = this.reply.replyid
                rep.rootid = this.reply.rootid
                rep.parentname = this.reply.replyname
                rep.replytime = new Date().getTime()
                rep.replycontent = this.rereplytext
                this.$emit('replycom', rep)
                this.rereplytext = ''
            }
        }
    }
}
</script>

<style>
  .reply_item {
      width: 600px;
      margin-top: 5px;
      padding: 10px 0 10px 20px;
      background-color: rgb(253, 251, 251);
      border-bottom: 1px dotted #000;
  }
  .rename {
      margin: 0 10px;
      font-weight: 700;
      color: #000;
  }
  .recontent {
      margin: 15px 0 0 15px;
      color: #000;
  }
  .rereplybox {
      position: relative;
     left: 280px;
  }
</style>