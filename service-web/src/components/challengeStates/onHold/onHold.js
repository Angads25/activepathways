import {UserService} from "../../../services/user"

export default {
  name: 'OnHold',
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
  },
  methods: {
    acceptOrSkip(str) {
      const challengeData = {...this.challengeData}
      console.log('>>>>>>>accept or skip clicked', "str" + str, challengeData)
      if (this.challengeData['user']['id']) {
        str === 'accept' ? challengeData['status'] = 'STARTED' : challengeData['status'] = 'SKIPPED'
        UserService.updateUserChallengeById(challengeData).then((response) => {
          this.$emit('challengeUpdated', response)
        })
      }
    }
  }
}
