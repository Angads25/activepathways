// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VeeValidate from 'vee-validate'
import router from './router'
import store from './store'
import './mixins'
import 'sweetalert2/dist/sweetalert2.css'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

Vue.use(VeeValidate)
Vue.use(VCalendar)

// CSS library
require('../node_modules/tachyons/css/tachyons.css')
require('./assets/css/common.css')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
