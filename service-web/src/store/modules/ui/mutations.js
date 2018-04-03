export default {
  showModal: (state, component) => {
    state.show_modal = true
    state.modal_content = component
  },
  hideModal: (state) => {
    state.show_modal = false
    setTimeout(
      () => {
        state.modal_content = null
      }, 500
    )
  },
  setResponseError: (state, payload) => {
    state.responseError = payload
  },
  showLoader: (state) => {
    state.show_loader = true
  },
  hideLoader: (state) => {
    state.show_loader = false
  },
  showToast: (state, component) => {
    state.show_Toast = true
    state.toastMessage = component
  }
}
