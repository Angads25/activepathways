export default {
  name: 'ProgramHeader',
  data() {
    return {
      options: [
        {
          id: 'back-top-title',
          label: 'BackTop'
        }
      ],
      activeModal: '',
      showHeader: false,
      isOpen: false,
      openerText: 'Open',
      showDrop: false
    }
  },
  computed: {
    showSignup() {
      // return this.$route.name !== "dashboard ?? challengestates"
      return (this.$route.name === 'dashboard')
    }
  },
  methods: {
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
    logout() {
      this.$loader.show()
      this.$store.dispatch('logout')
      this.$router.push({
        name: 'landingpage'
      })
      this.$loader.hide()
    }
  }
}
