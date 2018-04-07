import {UserService} from "../../../services/user"

export default {
  name: 'Doing',
  props: {
    challengeData: {
      default () {
        return {}
      }
    },
    programmeData: {
      default () {
        return {}
      }
    },
    isChallengeDetail: {default: false}
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
  },
  computed: {
    dayNum () {
      let idx = -1;
      for (let i = 0; i < (this.programmeData.challenges || []).length; i++) {
        if (this.programmeData.challenges[i].id === this.challengeData.id) {
          idx = i
          break
        }
      }
      return idx + 1
    }
  }
}
