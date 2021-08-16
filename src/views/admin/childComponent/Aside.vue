<template>
  <div class="adaside">
        <div class="imgs">
            <img src="../../../assets/img/SpongeBob2.jpg" alt="头像">
        </div>
        <h2>成碟青瓜过大海</h2>
        <ul>
            <li v-for="(item) in control" 
                :key="item.title" 
                :class="{activeAside: $route.path.indexOf(item.path) !== -1}"
                @click="jump(item.path)">{{item.title}}</li>
        </ul>
  </div>
</template>

<script>
export default {
    name: 'Aside',
    data(){
        return {
            control: [
                {
                    title: "日常管理",
                    path: "/admin/myhome"
                },
                {
                    title: "学习笔记管理",
                    path: "/admin/study"
                },
                {
                    title: "兴趣管理",
                    path: "/admin/interest"
                },
                {
                    title: "添加新文章",
                    path: "/admin/addarticles"
                },
                {
                    title: "草稿箱",
                    path: "/admin/savebox"
                },
                {
                    title: "标签管理",
                    path: "/admin/tags"
                },
                {
                    title: "评论管理",
                    path: "/admin/comments"
                }
            ]
        }
    },
    methods: {
        jump(path){
            this.$router.push(path);
        }
    }
}
</script>

<style>
 .adaside {
     color: whitesmoke;
     
 }
 .adaside .imgs {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translate(-50%);
    width: 90px;
    height: 90px;
    border-radius: 45px;
    overflow: hidden;
}
.imgs img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;/**让图片等比例缩小不变形，等高缩小不变形（也可以等宽 width：100%即可） */
}
.adaside h2 {
    margin-top: 120px;
}
.adaside ul {
    margin-top: 30px;
}
.adaside ul li {
    height: 50px;
    line-height: 42px;
    color: white;
    background-color: var(--my-color);
    border-bottom: 5px solid whitesmoke;
    border-top: 5px solid whitesmoke;
    margin-top: -5px;/**解决边框叠加问题 */
    cursor: pointer;
}

.activeAside {
    background-color: whitesmoke !important;
    color: goldenrod !important;
}
</style>