import {UserService} from "../../../services/user"

export default {
  name: 'Doing',
  props: {
    challengeData: {
      default() {
        return {}
      }
    },
    isChallengeDetail: {default: false}
  },
  computed: {
    userChallengeStateList() {
      return this.$store.state.auth.userChallengeStateList
    },
    indexOfCurrentChallenge() {
      return this.userChallengeStateList.indexOf(this.challengeData) + 1
    }
  },
  methods: {
    done() {
      console.log('>>>', 'doneclicked')
      const challengeData = {...this.challengeData}
      if (this.challengeData['user']['id']) {
        challengeData['status'] = 'COMPLETED'
        UserService.updateUserChallengeById(challengeData).then((response) => {
          this.$emit('challengeUpdated', response)
        })
      }
    }
  }
}
