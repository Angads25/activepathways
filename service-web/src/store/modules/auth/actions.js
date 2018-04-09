import {AuthService} from '../../../services/auth'
import {UserService} from '../../../services/user'
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
        }).catch(err => {
          reject(err)
        })
    })
  },
  signin ({commit}, payload) {
    return new Promise((resolve, reject) => {
      AuthService.signin(payload)
        .then(resp => {
          if (resp.id) {
            commit('setUser', resp)
            commit('setAuthToken', resp['token'])
            LocalData.set.authToken(resp['token'])
            resolve(resp)
          }
        }).catch(err => {
          reject(err)
        })
    })
  },
  fetchUserChallengeStateList ({commit}, payload) {
    return new Promise((resolve, reject) => {
      UserService.userChallengeStateList(payload)
        .then(resp => {
          commit('setUserChallengeState', resp)
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
    })
  },
  openForgetPassword ({commit}, payload) {
    return new Promise((resolve, reject) => {
      AuthService.forgetPassword(payload)
        .then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
    })
  },
  fetchAuthFromLocal ({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      const auth = LocalData.fetch.authToken()
      if (auth) {
        commit('setAuthToken', auth)
        AuthService.myProfile()
          .then(resp => {
            if (resp.id) {
              commit('setUser', resp)
              resolve(resp)
            } else {
              dispatch('logout')
              reject(resp)
            }
          })
          .catch(err => {
            dispatch('logout')
            reject(err)
          })
      } else {
        dispatch('logout')
        reject(auth)
      }
    })
  },
  logout ({commit}) {
    commit('setUser', {})
    commit('setAuthToken', '')
    LocalData.destroy.authToken()
  }
}
