// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'
import './assets/reset.css'

/* 封装全局组件 */
import vCom from './common/index.js'
for (const i in vCom) {
    Vue.component(i, vCom[i])
  }

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$imgUrl = 'http://localhost:3000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
