export default {
  name: 'Skipped',
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
    isChallengeDetail: { default: false }
  },
  computed: {
    dayNum () {
      let idx = -1;
      for (let i = 0; i < (this.programmeData|| []).length; i++) {
        if (this.programmeData[i].id === this.challengeData.id) {
          idx = i
          break
        }
      }
      return idx + 1
    }
  }
}
