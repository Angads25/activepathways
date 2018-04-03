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
  methods: {
    acceptOrSkip(str) {
      console.log('>>>>>>>accept or skip clicked',"str"+str)
      const challengeData = { ...this.challengeData }
      str==='accept' ? challengeData['status'] = 'STARTED' : challengeData['status'] = 'SKIPPED'
      UserService.updateUserChallengeById(challengeData).then((response) => {
        this.$emit('challengeUpdated', response)
      })
    }
  }
}
