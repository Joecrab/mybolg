<template>
  <div>
    <h4 class="linkh">常用链接</h4>
      <a href="https://www.baidu.com/"><img src="../../../assets/img/baidu.jpg" alt="百度" class="linkimg"></a>
      <a href="https://cn.vuejs.org/"><img src="../../../assets/img/vuejs.png" alt="Vue" class="linkimg"></a>
      <a href="https://github.com/"><img src="../../../assets/img/github.jpg" alt="Github" class="linkimg"></a>
  </div>
</template>

<script>
export default {
    name: "AsideLink"
}
</script>

<style>
 .linkh {
   text-align: center;
   padding-bottom: 3px;
   color: #000;
   border-bottom: 2px solid rgba(175, 162, 126, 0.5);
 }
 .linkimg {
   width: 80px;
   height: 80px;
   margin-right: 8px;
 }
</style>