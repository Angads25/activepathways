import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    auth
  }
})
