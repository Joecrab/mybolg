import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from './js/element-config.js'
import 'element-ui/lib/theme-chalk/index.css'

import md5 from 'js-md5'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import * as filters from './js/filter.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$md5 = md5
Vue.use(mavonEditor)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
  //全局过滤器，文本数据格式化
})

router.beforeEach((to, from, next) => {//使用全局导航
  if(to.meta.needLogin){//判断该路由是否需要登录才能进
    if(sessionStorage.getItem("token")){//有token了证明登录成了
      next();
    }
    else{
      next({
        path: '/login'
      });//没有token，想直接输入文件名进去不行！
    }
  }
  else{
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
