import {UserService} from '../../services/user'
import OnHold from '@/components/challengeStates/onHold/onHold.vue'
import Doing from '@/components/challengeStates/doing/doing.vue'
import Skipped from '@/components/challengeStates/skipped/skipped.vue'
import Done from '@/components/challengeStates/done/done.vue'
import NotDone from '@/components/challengeStates/notDone/notDone.vue'
import NoCheckIn from '@/components/challengeStates/noCheckIn/noCheckIn.vue'

export default {
  name: 'ChallengePage',
  components: {
    OnHold,
    Doing,
    Skipped,
    Done,
    NotDone,
    NoCheckIn
  },
  data() {
    return {
      type: 0,
      challengeData: {},
      statusComponents: {
        PENDING: OnHold,
        STARTED: Doing,
        COMPLETED: Done,
        SKIPPED: Skipped
      }
    }
  },
  computed: {
    userChallengeStateList() {
      // console.log('###################',this.$store.state.auth.userChallengeStateList)
      return this.$store.state.auth.userChallengeStateList
    },
    currentProgrammeData() {
      return this.userChallengeStateList.sort((c1, c2) => +new Date(c1.challengeDate) - +new Date(c2.challengeDate))
    }
  },
  created() {
    this.fetchChallengeData()
    this.$store.dispatch('fetchUserChallengeStateList')
  },
  methods: {
    fetchChallengeData() {
      UserService.userChallengeById(this.$route.params['id'])
        .then(resp => {
          console.log(resp)
          this.challengeData = resp
        })
    },
    challengeUpdated(event) {
      this.fetchChallengeData()
    }
  }
}
