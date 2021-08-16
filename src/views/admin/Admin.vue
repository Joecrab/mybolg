<template>
  <div id="admin">
    <ad-container>
      <keep-alive exclude="UpdateArticle,CommentDetail"><router-view></router-view></keep-alive>
    </ad-container>
  </div>
</template>

<script>
import adContainer from './childComponent/container.vue';
export default {
    name: 'Admin',
    components: {
      adContainer
    }
}
</script>

<style>
#admin {
  height: 100%;
  width: 100%;
}
</style>