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
              }).catch(err => {
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
    }
  }
}
