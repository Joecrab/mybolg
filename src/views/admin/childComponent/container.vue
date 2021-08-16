<template>
  <div class="adcontainer">
      <el-container>
          <el-aside width="250px">
              <ad-aside></ad-aside>
          </el-aside>
          <el-container>
              <el-header height="50px">
                  <ad-header></ad-header>
              </el-header>
              <el-main>
                  <slot></slot>
              </el-main>
              <el-footer height="40px">
                  <ad-footer></ad-footer>
              </el-footer>
            </el-container>
        </el-container>
  </div>
</template>

<script>
import adAside from './Aside.vue';
import adHeader from './Header.vue';
import adFooter from './Footer.vue';
export default {
    name: 'container',
    components: {
        adAside,
        adHeader,
        adFooter
    }
}
</script>

<style>
.adcontainer {
    width: 100%;
    height: 100%;
}
.adcontainer .el-container {
    width: 100%;
    height: 100%;
    border-left: 3px solid whitesmoke;
}
.adcontainer .el-header {
    background-color: var(--my-color);
    text-align: right;
    line-height: 50px;
  }

.adcontainer .el-footer {
    text-align: center;
    line-height: 40px;
}
  
.adcontainer .el-aside {
    position: relative;
    text-align: center;
    background-color: var(--my-color);
  }
  
.adcontainer .el-main {
    color: #333;
  }
</style>