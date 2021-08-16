import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/visit/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/visit/Home.vue')
  },
  {
    path: '/visitstudy',
    name: 'ViStudy',
    component: () => import('../views/visit/ViStudy.vue')
  },
  {
    path: '/visitinterest',
    name: 'ViInterest',
    component: () => import('../views/visit/ViInterest.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/visit/About.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/visit/ArticleDetail.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      needLogin: true //添加这个属性表示要进入这个路由需要先登录验证
    },
    component: () => import('../views/admin/Admin.vue'),
    //子路由
    children: [
      {
        path: 'myhome',
        name: 'myHome',
        meta: {
          needLogin: true
        },
        component: () => import('../views/admin/childPages/AdminHome.vue')
      },
      {
        path: 'study',
        name: 'study',
        meta: {
          needLogin: true
        },
        component: () => import('../views/admin/childPages/AdminStudy.vue')
      },
      {
        path: 'interest',
        name: 'interest',
        meta: {
          needLogin: true
        },
        component: () => import('../views/admin/childPages/AdminInter.vue')
      },
      {
        path: 'addarticles',
        name: 'addarticles',
        meta: {
          needLogin: true
        },
        component: () => import('../views/admin/childPages/AddArticles.vue')
      },
      {
        path: 'savebox',
        name: 'savebox',
        meta: {
          needLogin: true
        },
        component: () => import('../views/admin/childPages/AdminSave.vue')
      },
      {
        path: 'tags',
        name: 'tags',
        meta: {
          needLogin: true
        },
        component: () => import('../views/admin/childPages/AdminTags.vue')
      },
      {
        path: 'comments',
        name: 'comments',
        meta: {
          needLogin: true
        },
        component: () => import('../views/admin/childPages/AdminComment.vue')
      },
      {
        path: 'update',
        name: 'update',
        meta: {
          needLogin: true
        },
        component: () => import('../views/admin/childPages/UpdateArticle.vue')
      },
      {
        path: 'commentdetail',
        name: 'commentdetail',
        meta: {
          needLogin: true
        },
        component: () => import('../views/admin/childPages/CommentDetail.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router