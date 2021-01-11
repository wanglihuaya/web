// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/js/remScale'
import './assets/css/reset.css'
import vueAwesomeCountdown from 'vue-awesome-countdown'

Vue.config.productionTip = false
Vue.use(vueAwesomeCountdown, 'vac')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
