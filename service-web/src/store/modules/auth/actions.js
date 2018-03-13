import {AuthService} from '../../../services/auth'
import {LocalData} from '../../../services/localData'

export default {
  signup ({commit}, payload) {
    return new Promise((resolve, reject) => {
      AuthService.signup(payload)
        .then(resp => {
          if (resp.id) {
            commit('setUser', resp)
            commit('setAuthToken', resp['token'])
            LocalData.set.authToken(resp['token'])
            resolve(resp)
          }
        })
    })
  }
}
