import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/views/LandingPage/landing-page.vue'
import Dashboard from '@/views/Dashboard/dashboard.vue'
import ChallengeStates from '@/views/ChallengeStates/challenge-states.vue'
import ChallengePage from '@/views/challenge-page/challenge-page.vue'
import {LocalData} from '../services/localData'
import TermsOfUse from '@/views/aboutus/terms-of-use/termsofuse.vue'
import PrivacyPolicy from '@/views/aboutus/privacy-policy/privacypolicy.vue'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/termsOfUse',
      name: 'terms-of-use',
      component: TermsOfUse
    },
    {
      path: '/privacyPolicy',
      name: 'privacy-policy',
      component: PrivacyPolicy
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
  if (['terms-of-use', 'privacy-policy'].indexOf(to.name) > -1) {
    next()
  } else {
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
  }
})

export default router
