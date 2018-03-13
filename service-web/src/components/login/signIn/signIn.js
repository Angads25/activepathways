export default {
  name: 'SignIn',
  data () {
    return {}
  },
  methods: {
    closeModal(event) {
      event.stopPropagation()
      this.$emit('closeModal')
    },
    openSignUp(event) {
      event.stopPropagation()
      this.$emit('openSignUp')
    }
  }
}
