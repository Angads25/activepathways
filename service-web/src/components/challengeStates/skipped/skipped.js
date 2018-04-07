export default {
  name: 'Skipped',
  props: {
    challengeData: {
      default () {
        return {}
      }
    },
    isChallengeDetail: { default: false }
  },
  computed: {
    userChallengeStateList() {
      return this.$store.state.auth.userChallengeStateList
    },
    indexOfCurrentChallenge() {
      return this.userChallengeStateList.indexOf(this.challengeData) + 1
    }
  }
}
