export default {
  name: 'NotesModal',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  created() {
    console.log(">>>>>>>>>>", ChallengesWithNotes)
  },
  computed: {
    userChallengeStateList() {
      // console.log('###################',this.$store.state.auth.userChallengeStateList)
      return this.$store.state.auth.userChallengeStateList
    },
    userJournal() {
      return this.userChallengeStateList.filter(challenge => !!challenge['notes'])
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
