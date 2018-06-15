import SignIn from '@/components/login/signIn/signIn.vue'
import SignUp from '@/components/login/signUp/signUp.vue'
import ForgetPassword from '@/components/login/forgetPassword/forgetPassword.vue'
import ResetPassword from '@/components/login/resetPassword/resetPassword.vue'
import VerifyEmailStatus from '@/components/login/verifyEmailStatus/verifyEmailStatus.vue'


export default {
  name: 'Header',
  data() {
    return {
      type: 0,
      activeModal: '',
      isOpen: false,
      openerText: 'Open',
      verifyStatus: '',
      verifyEmailMessage: ''
    }
  },
  components: {
    SignIn,
    SignUp,
    ForgetPassword,
    ResetPassword,
    VerifyEmailStatus
  },
  created() {
    console.log("token is>>>>", this.$route)
    if (this.$route.params.resetToken) {
      this.activeModal = 'resetPassword';
      this.openModal();
    }
    if ((this.$route.fullPath || '').match('redirect') && !this.$route.query.success) {
      this.activeModal = 'signin';
      this.openModal();
    }
    if (this.$route.query.success) {
      this.activeModal = 'verifyEmailStatus';
      this.verifyEmailMessage = this.$route.query.success;
      this.verifyStatus = "SUCCESS";
      console.log("----------", this.$route.query.success);
      this.openModal();
    }
    if (this.$route.query.error) {
      this.activeModal = 'verifyEmailStatus';
      this.verifyEmailMessage = this.$route.query.error;
      this.verifyStatus = "ERROR";
      this.openModal();
    }
  },
  computed: {
    showHeader() {
      // return this.$route.name !== "dashboard ?? challengestates"
      return (this.$route.name === 'challengestates') || (this.$route.name === 'dashboard') || (this.$route.name === 'challenge-detail') || (this.$route.name === 'programs-catalogue')
    }
  },
  watch: {
    "$route"(to, from){
      console.log('in header watcher', to, from)
      if (to.query.redirect && (!to.query.success || !to.query.error)) {
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
    openModal(loc, type) {
      console.log('>>>>>>>>..', 'open modal called', loc, type)
      window._gtmCtxSignUp = {loc: loc, type: type}
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
