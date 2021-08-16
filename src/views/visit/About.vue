<template>
  <div id="about">
      <tab-header></tab-header>
      <div class="wdefine">
           <h3 class="vititle">关于博客</h3>
           <div>
               <p>本博客的搭建比较简单，使用了vue、element ui、vue-router、axios</p>
               <p>用了node来搭建本地服务器，对数据库的操作和数据响应就在这里面的express框架中实现</p>
               <p>数据库使用了mysql</p>
               <el-button type="primary" size="mini" @click="jump" class="abtn">进入个人主页</el-button>
           </div>
      </div>
  </div>
</template>

<script>
import TabHeader from './childConponent/TabHeader.vue'
export default {
    name: "About",
    components: {
        TabHeader
    },
    methods: {
        jump(){
            this.$router.push('/login')
        }
    }
}
</script>

<style>
 .wdefine {
     width: 1000px;
     margin: 0 auto;
 }
 .abtn {
     margin-top: 20px;
 }
</style>