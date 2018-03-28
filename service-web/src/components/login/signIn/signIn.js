export default {
  name: 'SignIn',
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
    openSignUp (event) {
      event.stopPropagation()
      this.$emit('openSignUp')
    },
    openForgetPassword (event) {
      event.stopPropagation()
      this.$emit('openForgetPassword')
    },
    getSignInData () {
      return {
        email: this.email,
        password: this.password
      }
    },
    signIn (event) {
      event.stopPropagation()
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            this.$loader.show()
            this.$store.dispatch('signin', this.getSignInData())
              .then(resp => {
                this.$router.push({
                  name: 'dashboard'
                })
                this.$loader.hide()
                this.closeModal(event)
              }).catch(err => {
                this.$loader.hide()
              })
          } else {
            console.log('form not validated')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
