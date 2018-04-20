import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/views/LandingPage/landing-page.vue'
import Dashboard from '@/views/Dashboard/dashboard.vue'
import ChallengeStates from '@/views/ChallengeStates/challenge-states.vue'
import ChallengePage from '@/views/challenge-page/challenge-page.vue'
import { LocalData } from '../services/localData'

Vue.use(Router)
const router =  new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/challengestates',
      name: 'challengestates',
      component: ChallengeStates
    },
    {
      path: '/:resetToken?',
      name: 'landingpage',
      component: LandingPage
    },
    {
      path: '/',
      name: 'home-view',
      component: LandingPage
    },
    {
      path: '/challenge/:id',
      name: 'challenge-detail',
      component: ChallengePage
    }
  ]
})
router.beforeEach((to, from, next) => {
  let authCheck = LocalData.fetch.authToken()
  if (['dashboard', 'challengestates', 'challenge-detail'].indexOf(to.name) > -1) {
    if (authCheck) {
      next()
    } else {
      next({
        name: 'home-view'
      })
    }
  }else{
    next()
  }
})

export default router
