export default {
  name: 'NoCheckIn',
  props: {
    programmeData: {default: []},
    challengeData: {
      default () {
        return {
          programme: {name: 'Starter Programme'},
          challenge: {
            name: 'Challenge - Starting Tomorrow',
            shortDescription: 'We will mail you tomorrow with your first challenge. Get ready for fun filled fitness :) .'
          },
          day: 'Zero'
        }
      }
    },
    isChallengeDetail: {default: false}
  },
  computed: {
    programmeResult () {
      return this.programmeData ? (this.programmeData[0] || {}).programme : {}
    },
    programmeState () {
      if (this.programmeData && this.programmeData.length) {
        if (new Date() > new Date(this.programmeData[this.programmeData.length - 1].challengeDate)) {
          return 'AFTER_END'
        }
        if (new Date() < new Date(this.programmeData[0].challengeDate)) {
          return 'BEFORE_START'
        }
      }
    }
  }
}
