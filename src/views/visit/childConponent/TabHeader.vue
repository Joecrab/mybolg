<template>
  <div id="navhead">
    <div class="headimg">
    </div>
    <el-menu :default-active="$route.path" 
             class="el-menu-demo" 
             mode="horizontal" 
             @select="handleSelect"
             background-color="#eee8aa"
             text-color="#a39f9f"
             active-text-color="#cd853f">
      <el-menu-item index="/home">日常随笔</el-menu-item>
      <el-menu-item index="/visitstudy">学习笔记</el-menu-item>
      <el-menu-item index="/visitinterest">兴趣分享</el-menu-item>
      <el-menu-item index="/about">关于本博客</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "TabHeader",
  data(){
    return {
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(key)
    }
  }
}
</script>

<style>
 .el-menu {
   padding-left: 500px;
 }
 .el-menu-item {
   font-weight: 700;
   font-size: 16px;
 }
 .headimg {
   background-color: #a39f9f;
   height: 174px;
   background:orange url(../../../assets/img/rabbit.png) repeat scroll -22px -390px;
 }
</style>
