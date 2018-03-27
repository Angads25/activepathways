import moment from 'moment'

import OnHold from '@/components/challengeStates/onHold/onHold.vue'
import Doing from '@/components/challengeStates/doing/doing.vue'
import Skipped from '@/components/challengeStates/skipped/skipped.vue'
import Done from '@/components/challengeStates/done/done.vue'
import NotDone from '@/components/challengeStates/notDone/notDone.vue'
import NoCheckIn from '@/components/challengeStates/noCheckIn/noCheckIn.vue'

export default {
  name: 'Dashboard',
  components: {
    OnHold,
    Doing,
    Skipped,
    Done,
    NotDone,
    NoCheckIn
  },
  data () {
    return {
      selectedDates: {
        start: new Date(2018, 2, 20),
        end: new Date(2018, 2, 28)
      },
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
      // return (this.$store.state.auth.userChallengeStateList.filter(function (x) {
      //   return x.status === 'PENDING'
      // })[0] || {})
      return this.userChallengeStateList[0]
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
    },
    differenceDays (d1, d2) {
      return moment(d1).diff(moment(d2), 'days')
    }
  },
  created () {
    this.$store.dispatch('fetchUserChallengeStateList')
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.userChallengeStatePending)
  }
}
