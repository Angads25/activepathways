import SignIn from '@/components/login/signIn/signIn.vue'
import SignUp from '@/components/login/signUp/signUp.vue'
import ForgetPassword from '@/components/login/forgetPassword/forgetPassword.vue'
import swal from 'sweetalert2'
import {IsUserAcceptedTerms, acceptedTermsAndConditions} from "../../services/userAcceptedOrNotTerms";

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
  mounted() {
    if(this.$route.params.scrollTo)  this.$refs.howItWorks.scrollIntoView()
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
    }
  },
  created() {
    if (!IsUserAcceptedTerms()) {
      swal({
        type: 'info',
        title: 'Disclaimer',
        html: 'We use cookies for analytical purposes. <a href="/terms#privacy" target="_blank"> Learn more </a>',
        backdrop: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        position: 'bottom-end',
        toast: true,
        confirmButtonText: 'ACCEPT',
      }).then((result) => {
        if (result && result.value) {
          acceptedTermsAndConditions()
        }
      })
    }
  }
}
