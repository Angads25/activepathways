import SignIn from '@/components/login/signIn/signIn.vue'
import SignUp from '@/components/login/signUp/signUp.vue'
import ForgetPassword from '@/components/login/forgetPassword/forgetPassword.vue'

export default {
  name: 'LandingPage',
  data() {
    return {
      options: [
        {
          id: 'back-top-title',
          label: 'BackTop'
        }
      ],
      activeModal: '',
      isOpen: false,
      openerText: 'Open'
    }
  },
  components: {
    SignIn,
    SignUp,
    ForgetPassword
  },
  methods: {
    closeModal() {
      document.body.classList.remove('modal-open')
      this.activeModal = ''
    },
    openModal(loc, type) {
      window._gtmCtxSignUp = {loc: loc, type: type}
      document.body.classList.add('modal-open')
    },
    open() {
      this.openerText = 'Close'
      this.isOpen = true
      document.body.classList.add('overlay-bg')
    },
    close() {
      this.openerText = 'Open'
      this.isOpen = false
      document.body.classList.remove('overlay-bg')
    },
    toggle() {
      if (this.isOpen) {
        this.close()
      } else {
        this.open()
      }
    },
    showAboutUs(aboutus) {
      aboutus === 1 ?
        //privacy policy
        this.$router.push('/privacyPolicy') :
        //termsOfUse
        this.$router.push('/termsOfUse')
    }
  }
}
