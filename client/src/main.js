import Vue from 'vue'
import App from './App'
import store from './store'

// 引入路由器
import router from './router/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import waterfall from 'vue-waterfall2'
Vue.use(ElementUI);

Vue.use(waterfall)

// 配置图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from './common/img/loading.gif'
Vue.use(VueLazyload, {
  loading
});

import './config/filters'
// 引入bootstrap
import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

new Vue({
  el:'#app',
  router,
  store,
  render: h=>h(App)
});
