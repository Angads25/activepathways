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
  methods: {
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
