import Modal from '@/components/modal/modal.vue'
import SignIn from '@/components/login/signIn/signIn.vue'

export default {
  name: 'Header',
  data () {
    return {
      type: 0,
      SignInComponent: SignIn,
      modalStatus: false
    }
  },
  components: {
    Modal
  },
  computed : {
    showHeader(){
      // return this.$route.name !== "dashboard ?? challengestates"
      return (this.$route.name === 'challengestates') || (this.$route.name === 'dashboard') || (this.$route.name === 'challenge-page')
    }
  }
}
