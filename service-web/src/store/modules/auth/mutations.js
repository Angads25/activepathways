export default {
  setUser (state, payload) {
    state.user = payload
  },
  setAuthToken (state, payload) {
    state.authToken = payload
  },
  setUserChallengeState (state, payload) {
    state.userChallengeStateList = payload
  }
}
