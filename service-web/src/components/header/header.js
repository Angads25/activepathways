import SignIn from '@/components/login/signIn/signIn.vue'
import SignUp from '@/components/login/signUp/signUp.vue'
import ForgetPassword from '@/components/login/forgetPassword/forgetPassword.vue'

export default {
  name: 'Header',
  data () {
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
    ForgetPassword
  },
  computed: {
    showHeader () {
      // return this.$route.name !== "dashboard ?? challengestates"
      return (this.$route.name === 'challengestates') || (this.$route.name === 'dashboard') || (this.$route.name === 'challenge-detail')
    }
  },
  methods: {
    closeModal () {
      document.body.classList.remove('modal-open')
      this.activeModal = ''
    },
    openModal () {
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
