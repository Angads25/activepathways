export default {
  name: 'SignIn',
  data() {
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
  computed: {
    showLoader() {
      return this.$store.state.ui.show_loader
    }
  },
  methods: {
    closeModal(event) {
      event.stopPropagation()
      this.$emit('closeModal')
    },
    openSignUp(event) {
      event.stopPropagation()
      this.$emit('openSignUp')
    },
    openForgetPassword(event) {
      event.stopPropagation()
      this.$emit('openForgetPassword')
    },
    getSignInData() {
      return {
        email: this.email,
        password: this.password
      }
    },
    signIn(event) {
      event.stopPropagation()
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            this.$loader.show()
            this.$store.dispatch('signin', this.getSignInData())
              .then(resp => {
                if (this.$route.query.redirect) {
                  this.$router.push({
                    path: this.$route.query.redirect
                  })
                } else {
                  this.$router.push({
                    name: 'dashboard'
                  })
                }
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
