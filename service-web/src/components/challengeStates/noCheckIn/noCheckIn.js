export default {
  name: 'NoCheckIn',
  props: {
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
    isChallengeDetail: { default: false }
  }
}
