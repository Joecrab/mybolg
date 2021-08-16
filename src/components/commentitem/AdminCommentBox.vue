<template>
  <div class="adcom_item">
      <span>@{{comment.diyname}}</span>
      <span class="adcommenttime">{{comment.comtime | formateDate('yyyy-MM-dd hh:mm:ss')}}</span>
      <p class="adcomcontent">{{comment.comcontent}}</p>
      <el-button type="danger" size="small" class="adcombtn" @click="comdelete">删除</el-button>
      <div class="replycomment" v-for="(item,index) in replyList" :key="index">
          <admin-replybox :reply="item" @redelete="adreplydel"></admin-replybox>
      </div>
  </div>
</template>

<script>
import {getReplyComments, deleteReplyComments, deleteComments} from '../../network/useToLogin.js'
import AdminReplybox from '../commentitem/AdminReplybox.vue'
export default {
    name: "AdminCommentBox",
    components: {
        AdminReplybox
    },
    data(){
        return {
            replyList: []
        }
    },
    props: {
        comment: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    mounted(){
        getReplyComments(this.comment.comid).then(res => {
            this.replyList = res
        })
    },
    methods: {
        adreplydel(reply){
            this.replyList.splice(this.replyList.indexOf(reply), 1)
        },
        comdelete(){
            this.$confirm('此操作将永久删除该评论, 是否继续?(PS：其回复会一并删除)', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    deleteComments(this.comment.comid).then(res => {
                        this.$message({
                            type: res.type,
                            message: res.msg
                            })
                            if(res.type == 'success'){
                                this.replyList = []
                                this.$emit('comdel', this.comment)
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
 .adcom_item {
     position: relative;
     font-size: 14px;
     padding: 0 0 10px 8px;
     margin-bottom: 25px;
     box-shadow: 0 2px 2px rgba(248, 171, 99, 0.3);
 }
 .adcommenttime {
     font-size: 12px;
     margin-left: 50px;
 }
 .adcomcontent {
     margin: 20px 0 10px 10px;
     color: #000;
 }
 .adcombtn {
      position: absolute;
      top: 18px;
      right: 20px;
  }
</style>