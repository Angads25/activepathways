import swal from 'sweetalert2'

export default {
  name: 'ResetPassword',
  data () {
    return {
      confirmpassword: '',
      newpassword: '',
      token:''
    }
  },
  props: {
    activeStatus: {
      default: false
    }
  },
  created() {
    this.token=this.$route.params.resetToken
    console.log('reset token is>>>>',this.token)
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
        resettoken: this.token,
        newpassword: this.newpassword
      }
    },
    resetPassword (event) {
      console.log(this.getData())
      event.stopPropagation()
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            this.$loader.show()
            this.$store.dispatch('setNewPassword', this.getData())
              .then(resp => {
                this.$loader.hide()
                if (resp.success) {
                  swal({
                    type: 'success',
                    title: 'Success',
                    text: 'Password reset successfully'
                  })
                  this.$emit('closeModal')
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
