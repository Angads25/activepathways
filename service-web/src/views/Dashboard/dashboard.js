export default {
  name: 'Dashboard',
  components: {
  },
  data () {
    return {
      selectedDate: null,
      themeStyles: {
        wrapper: {
          border: '1'
        },
        header: {
          color: '#fafafa',
          backgroundColor: '#f142f4',
          borderColor: '#404c59',
          borderWidth: '1px 1px 0 1px'
        },
        headerVerticalDivider: {
          borderLeft: '1px solid #404c59'
        },
        weekdays: {
          color: '#ffffff',
          backgroundColor: '#f142f4',
          borderColor: '#ff0098',
          borderWidth: '0 1px',
          padding: '5px 0 10px 0'
        },
        weekdaysVerticalDivider: {
          borderLeft: '1px solid #404c59'
        },
        weeks: {
          border: '1px solid #dadada'
        }
      }
    }
  },
  computed: {
    userChallengeStateList () {
      return this.$store.state.auth.userChallengeStateList
    },
    userChallengeStatePending () {
      return (this.$store.state.auth.userChallengeStateList.filter(function (x) {
        return x.status === 'PENDING'
      })[0] || {})
    }
  },
  methods: {
    logout () {
      this.$loader.show()
      this.$store.dispatch('logout')
      this.$router.push({
        name: 'landingpage'
      })
      this.$loader.hide()
    }
  },
  created () {
    this.$store.dispatch('fetchUserChallengeStateList')
  }
}
