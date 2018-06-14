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
import moment from 'moment'
import vueScrollto from 'vue-scrollto'
import VmBackTop from 'vue-multiple-back-top'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import VueYouTubeEmbed from 'vue-youtube-embed'

Raven
  .config('https://c5a9b905c4bd46c5a271eb0c8e334480@sentry.io/1206277')
  .addPlugin(RavenVue, Vue)
  .install()

Vue.use(VueYouTubeEmbed)
Vue.use(Element)
Vue.use(VeeValidate)
Vue.use(VCalendar)
Vue.use(vueScrollto)
Vue.component(VmBackTop.name, VmBackTop)

// CSS library
require('../node_modules/tachyons/css/tachyons.css')
require('./assets/css/common.css')

Vue.config.productionTip = false
Vue.filter('parseDate', function (value, format) {
  if (value) return moment(value).format(format)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
