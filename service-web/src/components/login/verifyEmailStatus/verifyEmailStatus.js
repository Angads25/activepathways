import swal from 'sweetalert2'

export default {
  name: 'VerifyEmailStatus',
  data () {
    return {
      email: ''
    }
  },
  props: {
    activeStatus: {
      default: false
    },
    message: {
      default: ''
    },
    type: {
      default: 'SUCCESS'
    }
  },
  created (){
    console.log("=======", this.message);
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
      event.stopPropagation()
      this.$emit('openSignIn')
    }
  }
}
