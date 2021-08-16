<template>
  <div id="app">
    <keep-alive exclude="ArticleDetail,Login,Commentsbox,Replybox"><router-view></router-view></keep-alive>
  </div>
</template>

<style>
@import './assets/css/base.css';
#app {
  height: 100%;
}
</style>
