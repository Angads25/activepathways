export default {
  name: 'NotesModal',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  created() {
  },
  computed: {
    userChallengeStateList() {
      // console.log('###################',this.$store.state.auth.userChallengeStateList)
      return this.$store.state.auth.userChallengeStateList
    },
    userJournal() {
      return this.userChallengeStateList.filter(challenge => !!challenge['notes']).sort((c1, c2) =>
        +new Date(c2.challengeDate) - +new Date(c1.challengeDate))
    }
  },
  props: {
    activeStatus: {
      default: false
    }
  },
  methods: {
    closeModal(event) {
      event.stopPropagation()
      this.$emit('closeModal')
    },
    openNotesModal(event) {
      event.stopPropagation()
      this.$emit('openNotesModal')
    }
  }
}
