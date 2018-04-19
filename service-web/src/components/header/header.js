import SignIn from '@/components/login/signIn/signIn.vue'
import SignUp from '@/components/login/signUp/signUp.vue'
import ForgetPassword from '@/components/login/forgetPassword/forgetPassword.vue'
import ResetPassword from '@/components/login/resetPassword/resetPassword.vue'


export default {
  name: 'Header',
  data() {
    return {
      type: 0,
      activeModal: '',
      isOpen: false,
      openerText: 'Open'
    }
  },
  components: {
    SignIn,
    SignUp,
    ForgetPassword,
    ResetPassword
  },
  created() {
    console.log("token is>>>>",this.$route.params)
    if(this.$route.params.resetToken){
      this.activeModal = 'resetPassword';
      this.openModal();
    }
  },
  computed: {
    showHeader() {
      // return this.$route.name !== "dashboard ?? challengestates"
      return (this.$route.name === 'challengestates') || (this.$route.name === 'dashboard') || (this.$route.name === 'challenge-detail')
    }
  },
  watch: {
    "$route"(to, from){
      console.log('in header watcher',to,from)
      if (to.query.redirect) {
        this.activeModal = 'signin';
        this.openModal();
      }
    }
  },
  methods: {
    closeModal() {
      document.body.classList.remove('modal-open')
      this.activeModal = ''
    },
    openModal() {
      console.log('>>>>>>>>..', 'open modal called')
      document.body.classList.add('modal-open')
    },
    open () {
      this.openerText = 'Close'
      this.isOpen = true
      document.body.classList.add('overlay-bg')
    },
    close () {
      this.openerText = 'Open'
      this.isOpen = false
      document.body.classList.remove('overlay-bg')
    },
    toggle () {
      if (this.isOpen) {
        this.close()
      } else {
        this.open()
      }
    }
  }
}
