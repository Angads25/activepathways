import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: LandingPage
    }
  ]
})
