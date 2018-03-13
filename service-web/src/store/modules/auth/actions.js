import {AuthService} from '../../../services/auth'

export default {
  signup ({commit}, payload) {
    return new Promise((resolve, reject) => {
      AuthService.signup(payload)
        .then(resp => {
          if (resp.id) {
            commit('setUser', resp)
            resolve(resp)
          }
        })
    })
  }
}
