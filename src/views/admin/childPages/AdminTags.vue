<template>
  <div id="adTags">
    <div class="daily">
      <h2>日常区标签</h2>
      <div class="content">
        <el-input
          class="input-new-tag"
          v-if="dinputVisible"
          v-model="dinputValue"
          ref="dsaveTagInput"
          size="small"
          @keyup.enter.native="dhandleInputConfirm('daily')"
          @blur="dhandleInputConfirm('daily')"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="dshowInput">+ New Tag</el-button>
        <el-tag
          type="warning"
          :key="tag.tagcontent"
          v-for="tag in dtags"
          closable
          :disable-transitions="false"
          @close="dhandleClose('daily',tag)">
          {{tag.tagcontent}}
        </el-tag>
      </div>
    </div>
    <div class="study">
      <h2>学习区标签</h2>
      <div class="content">
        <el-input
          class="input-new-tag"
          v-if="sinputVisible"
          v-model="sinputValue"
          ref="ssaveTagInput"
          size="small"
          @keyup.enter.native="shandleInputConfirm('study')"
          @blur="shandleInputConfirm('study')"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="sshowInput">+ New Tag</el-button>
        <el-tag
          type="warning"
          :key="tag.tagcontent"
          v-for="tag in stags"
          closable
          :disable-transitions="false"
          @close="shandleClose('study',tag)">
          {{tag.tagcontent}}
        </el-tag>
      </div>
    </div>
    <div class="interest">
      <h2>兴趣区标签</h2>
      <div class="content">
        <el-input
          class="input-new-tag"
          v-if="iinputVisible"
          v-model="iinputValue"
          ref="isaveTagInput"
          size="small"
          @keyup.enter.native="ihandleInputConfirm('interest')"
          @blur="ihandleInputConfirm('interest')"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="ishowInput">+ New Tag</el-button>
        <el-tag
          type="warning"
          :key="tag.tagcontent"
          v-for="tag in itags"
          closable
          :disable-transitions="false"
          @close="ihandleClose('interest',tag)">
          {{tag.tagcontent}}
        </el-tag>
      </div>
    </div>

  </div>
</template>

<script>
import {addTags, deleteTags, getTages} from '../../../network/useToLogin.js'
export default {
    name: 'AdminTags',
    data(){
      return {
        dinputVisible: false,
        dinputValue: '',
        sinputVisible: false,
        sinputValue: '',
        iinputVisible: false,
        iinputValue: '',
        dtags: [],
        stags: [],
        itags: []
      }
    },
    created(){
      getTages()
      .then(res => {
        this.dtags = res.dtags;
        this.stags = res.stags;
        this.itags = res.itags;
      })
    },
    methods: {
      dshowInput(type){
        this.dinputVisible = true;
        this.$nextTick(_ => {
          this.$refs.dsaveTagInput.$refs.input.focus();})
        //this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
            //它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上
            //这里可以理解为的就是先让input框出来，dom更新后它出来了嘛，然后再获取焦点
      },
      dhandleInputConfirm(type) {
        let dinputValue = this.dinputValue;
        if (dinputValue) {
          addTags(type, dinputValue)
          .then(res => {
            this.$message({
              type: res.type,
              message: res.msg,
              showClose: true
            })
            if(res.type === 'success'){
              this.dtags.push({tagcontent: dinputValue});
            }
          })
        }
        this.dinputVisible = false;
        this.dinputValue = ''
      },
      dhandleClose(type,tag) {
        deleteTags(type,tag.tagcontent)
        .then(res => {
          this.$message({
            type: res.type,
            message: res.msg,
            showClose: true
          })
          if(res.type === 'success'){
              this.dtags.splice(this.dtags.indexOf(tag), 1);
              //删除数组中的元素
            }
        })
      },
      sshowInput(type){
        this.sinputVisible = true;
        this.$nextTick(_ => {
        this.$refs.ssaveTagInput.$refs.input.focus();})
      },
      shandleInputConfirm(type) {
        let sinputValue = this.sinputValue;
        if (sinputValue) {
          addTags(type, sinputValue)
          .then(res => {
            this.$message({
              type: res.type,
              message: res.msg,
              showClose: true
            })
            if(res.type === 'success'){
              this.stags.push({tagcontent: sinputValue});
            }
          })
        }
        this.sinputVisible = false;
        this.sinputValue = ''
      },
      shandleClose(type,tag) {
        deleteTags(type,tag.tagcontent)
        .then(res => {
          this.$message({
            type: res.type,
            message: res.msg,
            showClose: true
          })
          if(res.type === 'success'){
              this.stags.splice(this.stags.indexOf(tag), 1);
            }
        })
      },
      ishowInput(type){
        this.iinputVisible = true;
        this.$nextTick(_ => {
          this.$refs.isaveTagInput.$refs.input.focus();})
        },
      ihandleInputConfirm(type) {
        let iinputValue = this.iinputValue;
        if (iinputValue) {
          addTags(type, iinputValue)
          .then(res => {
            this.$message({
              type: res.type,
              message: res.msg,
              showClose: true
            })
            if(res.type === 'success'){
              this.itags.push({tagcontent: iinputValue});
            }
          })
        }
        this.iinputVisible = false;
        this.iinputValue = ''
      },
      ihandleClose(type,tag) {
        deleteTags(type,tag.tagcontent)
        .then(res => {
          this.$message({
            type: res.type,
            message: res.msg,
            showClose: true
          })
          if(res.type === 'success'){
              this.itags.splice(this.itags.indexOf(tag), 1);
              //删除数组中的元素
            }
        })
      },
    }
}
</script>

<style>
#adTags {
  height: 100%;
  width: 100%;
}
.content {
  height: 150px;
  margin-bottom: 18px;
  border: 2px solid #000;
  border-radius: 10px;
  overflow: auto;
}
.button-new-tag {
    margin-left: 10px;
    margin-top: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    margin-top: 10px;
    vertical-align: bottom;
  }
  .el-tag {
    margin-left: 10px;
    margin-top: 10px;
  }
</style>