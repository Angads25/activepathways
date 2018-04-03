import {UserService} from "../../../services/user"

export default {
  name: 'Doing',
  props: {
    challengeData: {
      default () {
        return {}
      }
    },
    isChallengeDetail: { default: false }
  },
  methods: {
    done() {
      console.log('>>>','doneclicked')
      const challengeData = { ...this.challengeData }
      challengeData['status'] = 'COMPLETED'
      UserService.updateUserChallengeById(challengeData).then((response) => {
        this.$emit('challengeUpdated', response)
      })
    }
  }
}
