<template>
  <div class="com_item">
      <img src="../../assets/img/132.jpg" alt="头像" class="comimg">
      <span>{{comment.diyname}}</span>
      <span class="commenttime">{{comment.comtime | formateDate('yyyy-MM-dd hh:mm:ss')}}</span>
      <p class="comcontent">{{comment.comcontent}}</p>
      <div class="replybox">
          <p>
              <span @click="showbox" class="replyp">回复</span>
              <span v-show="isShow" @click="cancel" class="replyp">  取消回复</span>
          </p>
          <div class="replycom" v-show="isShow">
              <el-input
              type="textarea"
              :rows="3"
              placeholder="请发布您的评论"
              v-model="replytext"
              class="decomment">
            </el-input>
            <el-button type="warning" size="small" class="combtn" @click="maincomsubmit">提交</el-button>
          </div>
      </div>
      <div class="replycomment" v-for="(item,index) in replyList" :key="index">
          <replybox :reply="item" @replycom="recomsubmit"></replybox>
      </div>
  </div>
</template>

<script>
import {insertReplyComments, getReplyComments} from '../../network/useToLogin.js'
import Replybox from './Replybox.vue'
export default {
    name: "Commentsbox",
    components: {
        Replybox
    },
    data(){
        return {
            isShow: false,
            replytext: '',
            replyList: []
        }
    },
    props: {
        comment: {
            type: Object,
            default(){
                return {}
            }
        },
        repindex: {
            type: Number,
            default: 0
        }
    },
    mounted(){
        getReplyComments(this.comment.comid).then(res => {
            this.replyList = res
        })
    },
    methods: {
        showbox(){
            this.isShow = true
        },
        cancel(){
            this.isShow = false
            this.replytext = ''
        },
        maincomsubmit(){
            if(this.replytext === ''){
                this.$message({
                    type: 'error',
                    message: '评论内容不能为空',
                    showClose: true
                })
            }
            else{
                let rep = {}
                rep.rootid = this.comment.comid
                rep.parentid = this.comment.comid
                rep.replyname = `复读机${this.repindex}_${this.replyList.length + 1}`
                rep.parentname = this.comment.diyname
                rep.replytime = new Date().getTime()
                rep.replycontent = this.replytext
                insertReplyComments(rep.parentid, rep.rootid, rep.replyname, rep.parentname, rep.replytime, rep.replycontent)
                .then(res => {
                    this.$message({
                        type: res.type,
                        message: res.msg,
                        showClose: true
                    })
                    if(res.type == 'success'){
                        rep.replyid = res.replyid
                        this.replyList.unshift(rep)
                        this.replytext = ''
                    }
                })
            }
        },
        recomsubmit(rep){
            rep.replyname = `回复复读机${this.repindex}_${this.replyList.length + 1}`
            insertReplyComments(rep.parentid, rep.rootid, rep.replyname, rep.parentname, rep.replytime, rep.replycontent)
            .then(res => {
                this.$message({
                    type: res.type,
                    message: res.msg,
                    showClose: true
                })
                if(res.type == 'success'){
                    rep.replyid = res.replyid
                    this.replyList.unshift(rep)
                }
            })
        }
    }
}
</script>

<style>
 .com_item {
     width: 650px;
     position: relative;
     font-size: 14px;
     padding: 0 0 10px 8px;
     margin-bottom: 25px;
     box-shadow: 0 2px 2px rgba(248, 171, 99, 0.3);
 }
 .comimg {
     position: relative;
     top: 8px;
     width: 38px;
     height: 38px;
     margin-right: 8px;
     border-radius: 30px;
 }
 .commenttime {
     font-size: 12px;
     margin-left: 50px;
 }
 .comcontent {
     margin: 20px 0 30px 10px;
     color: #000;
 }
 .replyp:hover {
     font-weight: 700;
     cursor: pointer;
     color: orange;
 }
 .replybox {
     position: relative;
     left: 300px;
 }
</style>