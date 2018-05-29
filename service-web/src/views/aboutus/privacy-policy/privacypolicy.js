export default {
  name: 'privacyPolicy',
  data() {
    return {

    }
  },
  methods: {
    goTo(x) {
      x === 1 ?
        //privacy policy
        this.$router.push('/privacyPolicy') :
        //termsOfUse
        this.$router.push('/termsOfUse')
    }
  }
}
