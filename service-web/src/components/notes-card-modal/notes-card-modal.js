export default {
  name: 'NotesModal',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  props: {
    activeStatus: {
      default: false
    }
  },
  methods: {
    closeModal (event) {
      event.stopPropagation()
      this.$emit('closeModal')
    },
    openNotesModal (event) {
      event.stopPropagation()
      this.$emit('openNotesModal')
    }
  }
}
