<template>
  <div class="adreply_item">
      <div>
          <span class="adrename">@{{reply.replyname}}</span>
          <span>回复</span>
          <span class="adrename">@{{reply.parentname}}</span>
          <span class="commenttime">{{reply.replytime | formateDate('yyyy-MM-dd hh:mm:ss')}}</span>
      </div>
      <p class="adrecontent">
          {{reply.replycontent}}
      </p>
      <el-button type="danger" size="mini" class="adrecombtn" @click="redelete">删除</el-button>
  </div>
</template>

<script>

import {deleteReplyComments} from '../../network/useToLogin.js'
export default {
    name: "AdminReplybox",
    props: {
        reply: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    methods: {
        redelete(){
            this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    deleteReplyComments(this.reply.replyid).then(res => {
                        this.$message({
                            type: res.type,
                            message: res.msg
                            })
                            if(res.type == 'success'){
                                this.$emit('redelete', this.reply)
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
  .adreply_item {
      position: relative;
      width: 600px;
      margin-top: 5px;
      padding: 10px 50px 10px 20px;
      background-color: rgb(253, 251, 251);
      border-bottom: 1px dotted #000;
  }
  .adrename {
      margin: 0 10px;
      font-weight: 700;
      color: #000;
  }
  .adrecontent {
      margin: 15px 0 0 15px;
      color: #000;
  }
  .adrecombtn {
      position: absolute;
      top: 18px;
      right: 20px;
  }
</style>