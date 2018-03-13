export default {
  name: 'SignUp',
  data () {
    return {}
  },
  methods: {
    closeModal(event) {
      event.stopPropagation()
      this.$emit('closeModal')
    },
    openSignIn(event) {
      event.stopPropagation()
      this.$emit('openSignIn')
    }
  }
}
