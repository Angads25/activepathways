import SignIn from '@/components/login/signIn/signIn.vue'
import SignUp from '@/components/login/signUp/signUp.vue'
import ForgetPassword from '@/components/login/forgetPassword/forgetPassword.vue'
import swal from 'sweetalert2'
import {getCookie, setCookie} from "../../services/index";

export default {
  name: 'LandingPage',
  data () {
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
    closeModal () {
      document.body.classList.remove('modal-open')
      this.activeModal = ''
    },
    openModal (loc, type) {
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
  },
  created () {
    if(!getCookie()){
      swal({
        title: 'Disclaimer',
        text: 'We use cookies for analytical purposes. Learn more',
        backdrop: true,
        allowOutsideClick : false,
        allowEscapeKey: false,
        allowEnterKey: false,
        position: 'top-end',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if(result && result.value) {
          setCookie()
        }
      })
    }
  }
}
