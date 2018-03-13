export default {
  name: 'SignUp',
  data () {
    return {
      fname: '',
      lname: '',
      email: '',
      password: ''
    }
  },
  methods: {
    closeModal (event) {
      event.stopPropagation()
      this.$emit('closeModal')
    },
    openSignIn (event) {
      event.stopPropagation()
      this.$emit('openSignIn')
    },
    signUp (event) {
      event.stopPropagation()
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            this.$store.dispatch('signup', this.getSignUpData())
              .then(resp => {
                console.log('>>>>>>>>>>', resp)
                this.closeModal(event)
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
