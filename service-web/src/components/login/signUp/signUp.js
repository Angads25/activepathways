export default {
  name: 'SignUp',
  data () {
    return {
      fname: '',
      lname: '',
      email: '',
      password: '',
      loading: false
    }
  },
  props: {
    activeStatus: {
      default: false
    }
  },
  computed: {
    showLoader () {
      return this.$store.state.ui.show_loader
    }
  },
  methods: {
    closeModal (event) {
      event.stopPropagation()
      this.$emit('closeModal')
      // document.body.classList.remove('modal-open')
    },
    openSignIn (event) {
      event.stopPropagation()
      this.$emit('openSignIn')
      // document.body.classList.add('modal-open')
      // document.body.style.overflow = 'hidden'
    },
    signUp (event) {
      event.stopPropagation()
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            // Send GTM event
            if (window._gtmCtxSignUp && window._gtmCtxSignUp.type === 'signup' && window._gtmCtxSignUp.loc) {
              console.log('Found GTM context', window._gtmCtxSignUp)
              let dataLayer = window.dataLayer || [];
              dataLayer.push({
                event: 'Sign up',
                eventCategory: 'Form',
                eventAction: 'Sign up',
                eventLabel: window._gtmCtxSignUp.loc // 'header' / 'sign up button' / 'Get started now button'
              })
            }

            this.$loader.show()
            this.loading = true
            this.$store.dispatch('signup', this.getSignUpData())
              .then(resp => {
                this.loading = false
                console.log('>>>>>>>>>>', resp)
                this.$router.push({
                  name: 'dashboard'
                })
                this.$loader.hide()
                this.closeModal(event)
              })
              .catch(err => {
                this.loading = false
                this.$loader.hide()
              })
          } else {
            console.log('form not validated')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getSignUpData () {
      return {
        name: {
          first: this.fname,
          last: this.lname
        },
        email: this.email,
        password: this.password
      }
    },
    showAboutUs(aboutus){
      this.$store.commit('hideModal')
      document.body.classList.remove('modal-open')
      if(aboutus===1) {
        //privacy policy
        this.$router.push('/privacyPolicy')
      } else {
        //termsOfUse
        this.$router.push('/termsOfUse')
      }
    }
  }
}
