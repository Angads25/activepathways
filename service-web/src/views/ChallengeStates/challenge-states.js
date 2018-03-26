import OnHold from '@/components/challengeStates/onHold/onHold.vue'
import Doing from '@/components/challengeStates/doing/doing.vue'
import Skipped from '@/components/challengeStates/skipped/skipped.vue'
import Done from '@/components/challengeStates/done/done.vue'
import NotDone from '@/components/challengeStates/notDone/notDone.vue'
import NoCheckIn from '@/components/challengeStates/noCheckIn/noCheckIn.vue'

export default {
  name: 'ChallengeStates',
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
    }
  }
}
