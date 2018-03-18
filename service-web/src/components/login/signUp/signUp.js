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
  props: {
    activeStatus: {
      default: true
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
            this.$loader.show()
            this.$store.dispatch('signup', this.getSignUpData())
              .then(resp => {
                console.log('>>>>>>>>>>', resp)
                this.$router.push({
                  name: 'challengestates'
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
