import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/views/LandingPage/landing-page.vue'
import Dashboard from '@/views/Dashboard/dashboard.vue'
import ChallengeStates from '@/views/ChallengeStates/challenge-states.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'landingpage',
      component: LandingPage
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/challengestates',
      name: 'challengestates',
      component: ChallengeStates
    }
  ]
})
