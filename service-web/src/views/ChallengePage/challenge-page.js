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
    NoCheckIn,
  },
  data() {
    return {
      type: 0,
      youtubeUrl: '',
      customVideoUrl:'',
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
    user() {
      return this.$store.state.auth.user
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
          this.challengeData = resp
          const videoId = this.getYoutubeIdFromUrl((this.challengeData['challenge'] || {})['youtube'] || '')
          videoId ? this.youtubeUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1` : '';
          this.customVideoUrl = ((this.challengeData['challenge'] || {})['customVideoUrl'] || '')
        })
    },
    getYoutubeIdFromUrl(url) {
      let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      let match = url.match(regExp);
      if (match && match[2].length == 11) {
        return match[2];
      } else {
        return '';
      }
    },
    logout() {
      this.$loader.show()
      this.$store.dispatch('logout')
      this.$router.push({
        name: 'landingpage'
      })
      this.$loader.hide()
    },
    challengeUpdated(event) {
      this.fetchChallengeData()
    }
  }
}
