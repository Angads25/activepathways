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
      todaysDate: new Date(),
      statusComponents: {
        PENDING: OnHold,
        STARTED: Doing,
        COMPLETED: Done,
        SKIPPED: Skipped
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
      return this.userChallengeStateList.find(challenge => this.$differenceDays(challenge['challengeDate'], new Date()) === 0)
    },
    userJournal () {
      return this.userChallengeStateList.filter(challenge => !!challenge['notes'])
    },
    userChallengeStateCompletedOrSkipped () {
      return this.userChallengeStateList.filter(challange => challange['status']==='COMPLETED' || challange['status']==='SKIPPED')
    },
    selectedDates ()
    {
      let start='', end= ''
      this.userChallengeStateList.map(challange => {
        if(!start){
          start=challange['challengeDate'],
            end=challange['challengeDate']
        } else {
          if(this.$differenceDays(start,challange['challengeDate'])>0)
          {
            start=challange['challengeDate']
          }
          if(this.$differenceDays(challange['challengeDate'],end)>0)
          {
            end=challange['challengeDate']
          }
        }
      })
      return {
        start:start,
        end:end
      }
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
    challengeUpdated (event) {
      console.log('>>>>>>>>>>>>>updated', event)
      this.$store.dispatch('fetchUserChallengeStateList')
    }
  },
  created () {
    this.$store.dispatch('fetchUserChallengeStateList')
  }
}
