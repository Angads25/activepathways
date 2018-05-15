import OnHold from '@/components/challengeStates/onHold/onHold.vue'
import Doing from '@/components/challengeStates/doing/doing.vue'
import Skipped from '@/components/challengeStates/skipped/skipped.vue'
import Done from '@/components/challengeStates/done/done.vue'
import NotDone from '@/components/challengeStates/notDone/notDone.vue'
import NoCheckIn from '@/components/challengeStates/noCheckIn/noCheckIn.vue'
import NotesModal from '@/components/notes-card-modal/notes-card-modal.vue'

export default {
  name: 'Dashboard',
  components: {
    OnHold,
    Doing,
    Skipped,
    Done,
    NotDone,
    NoCheckIn,
    NotesModal
  },
  data() {
    return {
      todaysDate: new Date(),
      statusComponents: {
        PENDING: OnHold,
        STARTED: Doing,
        COMPLETED: Done,
        SKIPPED: Skipped,
        NO_CHECKIN: NoCheckIn,
        openerText: 'Open'
      },
      activeModal: '',
      isOpen: false,
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
    userChallengeStateList() {
      // console.log('###################',this.$store.state.auth.userChallengeStateList)
      return this.$store.state.auth.userChallengeStateList
    },
    user() {
      return this.$store.state.auth.user
    },
    userChallengeStatePending() {
      return this.userChallengeStateList.find(challenge => {
        console.log('==========', this.$differenceDays(challenge['challengeDate'], new Date()))
        return this.$differenceDays(challenge['challengeDate'], new Date()) === 0
      })
    },
    currentProgrammeData() {
      return this.userChallengeStateList.sort((c1, c2) => +new Date(c1.challengeDate) - +new Date(c2.challengeDate))
    },
    userJournal() {
      return this.userChallengeStateList.filter(challenge => !!challenge['notes']).sort((c1, c2) =>
      +new Date(c2.challengeDate) - +new Date(c1.challengeDate))
    },
    userChallengeStateCompletedOrSkipped() {
      const sortedlist = this.userChallengeStateList.filter(challange => challange['status'] === 'COMPLETED' || challange['status'] === 'SKIPPED').sort((c1, c2) =>
      +new Date(c2.challengeDate) - +new Date(c1.challengeDate))
      return sortedlist;
    },
    selectedDates() {
      let start = '', end = ''
      this.userChallengeStateList.map(challange => {
        if (!start) {
          start = challange['challengeDate']
          end = challange['challengeDate']
        } else {
          if (this.$differenceDays(start, challange['challengeDate']) > 0) {
            start = challange['challengeDate']
          }
          if (this.$differenceDays(challange['challengeDate'], end) > 0) {
            end = challange['challengeDate']
          }
        }
      })
      return [
        {
          key: 'programme',
          highlight: {
            backgroundColor: '#41c9c5',
            // Other properties are available too, like `height` & `borderRadius`
          },
          contentStyle: {
            color: '#ffffff',
          },
          dates: {
            start: start,
            end: end
          }
        },
        {
          key: 'today',
          highlight: {
            backgroundColor: '#001c44',
            // Other properties are available too, like `height` & `borderRadius`
          },
          contentStyle: {
            color: '#ffffff',
          },
          dates: new Date()
        }
      ]
    }
  },
  methods: {
    logout() {
      this.$loader.show()
      this.$store.dispatch('logout')
      this.$router.push({
        name: 'landingpage'
      })
      this.$loader.hide()
    },
    dayNum(challengeData) {
      let idx = -1;
      for (let i = 0; i < (this.currentProgrammeData || []).length; i++) {
        if (this.currentProgrammeData[i].id === challengeData.id) {
          idx = i
          break
        }
      }
      return idx + 1

    },
    challengeUpdated(event) {
      this.$store.dispatch('fetchUserChallengeStateList')
    },
    closeModal() {
      document.body.classList.remove('modal-open')
      this.activeModal = ''
    },
    openModal() {
      document.body.classList.add('modal-open')
    },
    open() {
      this.openerText = 'Close'
      this.isOpen = true
      document.body.classList.add('overlay-bg')
    },
    close() {
      this.openerText = 'Open'
      this.isOpen = false
      document.body.classList.remove('overlay-bg')
    }
  },
  created() {
    this.$store.dispatch('fetchUserChallengeStateList')
  }
}

