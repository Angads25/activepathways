import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/views/LandingPage/landing-page.vue'
import Dashboard from '@/views/Dashboard/dashboard.vue'
import ChallengeStates from '@/views/ChallengeStates/challenge-states.vue'
import ChallengePage from '@/views/ChallengePage/challenge-page.vue'
import ProgramsCatalogue from '@/views/ProgramsCatalogue/programs-catalogue.vue'
import ProgramPage from '@/views/ProgramPage/programPage.vue'
import {LocalData} from '../services/localData'

Vue.use(Router)
const router = new Router({
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
    },
    {
      path: '/programs-catalogue',
      name: 'programs-catalogue',
      component: ProgramsCatalogue
    },
    {
      path: '/program-page',
      name: 'program-page',
      component: ProgramPage
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
        name: 'home-view',
        query: {
          redirect: to.path
        }
      })
    }
  }
  if (['dashboard', 'challengestates', 'challenge-detail'].indexOf(to.name) === -1) {
    if (!authCheck) {
      next()
    } else {
      next({name: from.name})
    }
  }
})

export default router
