export default {
  name: 'SignUp',
  data () {
    return {
      fname: '',
      lname: '',
      email: '',
      password: '',
      cpassword: ''
    }
  },
  methods: {
    closeModal(event) {
      event.stopPropagation()
      this.$emit('closeModal')
    },
    openSignIn(event) {
      event.stopPropagation()
      this.$emit('openSignIn')
    },
    signUp (event) {
      event.stopPropagation()
      this.$store.dispatch('signup', this.getSignUpData())
        .then(resp => {
          this.closeModal(event)
        })
    },
    getSignUpData() {
      return {
        name: {
          first: this.fname,
          last: this.lname
        },
        email: this.email,
        password: this.password
      }
    }
  }
}
