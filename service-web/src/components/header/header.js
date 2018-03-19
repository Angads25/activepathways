import SignIn from '@/components/login/signIn/signIn.vue'
import SignUp from '@/components/login/signUp/signUp.vue'
import ForgetPassword from '@/components/login/forgetPassword/forgetPassword.vue'

export default {
  name: 'Header',
  data () {
    return {
      type: 0,
      activeModal: ''
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
      return (this.$route.name === 'challengestates') || (this.$route.name === 'dashboard') || (this.$route.name === 'challenge-page')
    }
  },
  methods: {
    closeModal () {
      // const __self = this
      // setTimeout(() => {
      //   __self.activeModal = ''
      // }, 300)
      this.activeModal = ''
    }
  }
}
