import swal from 'sweetalert2'

export default {
  name: 'ResetPassword',
  data () {
    return {
      confirmpassword: '',
      newpassword: ''
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
    closeModal (event) {
      event.stopPropagation()
      this.$emit('closeModal')
    },
    openSignIn (event) {
      console.log('open sign in called in reset password')
      event.stopPropagation()
      this.$emit('openSignIn')
    },
    getData () {
      return {
        email: this.email
      }
    },
    forgetPassword (event) {
      event.stopPropagation()
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            this.$loader.show()
            this.$store.dispatch('openForgetPassword', this.getData())
              .then(resp => {
                this.$loader.hide()
                if (resp.success) {
                  swal({
                    type: 'success',
                    title: 'Success',
                    text: 'Email sent to your email'
                  })
                }
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
