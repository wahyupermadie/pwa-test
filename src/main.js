// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Simplert from 'vue2-simplert-plugin'
import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)
Vue.use(Simplert)

Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
