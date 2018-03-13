export default {
  name: 'Modal',
  computed: {
    modalStatus: {
      get () {
        return this.$store.state.ui.show_modal
      },
      set (value) {
        if (!value) {
          this.$modal.hide()
        }
      }
    }
  }
}
