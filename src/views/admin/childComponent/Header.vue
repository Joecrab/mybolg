<template>
  <div id="adHeader">
    <el-button size="small" round @click="gotohome">首页</el-button>
    <el-button size="small" round @click="loginout">退出</el-button>
  </div>
</template>

<script>
export default {
    name: 'adHeader',
    methods: {
        gotohome(){
          this.$router.push('/home')
        },
        loginout(){
            sessionStorage.removeItem("token");
            this.$router.replace('/login')
        }
    }
}
</script>

<style>
</style>