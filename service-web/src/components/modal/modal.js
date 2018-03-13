export default {
  name: 'Modal',
  props: {
    status: {
      default: false
    },
    activeComponent: {
      default: ''
    }
  },
  methods: {
    closeModal (event) {
      event.stopPropagation()
      this.$emit('closeModal')
    }
  }
}
