import Vue from 'vue'

Vue.mixin({
  created: function () {
    this.$modal = {
      show: (content) => this.$store.commit('showModal', content),
      hide: () => this.$store.commit('hideModal')
    }
    this.$loader = {
      show: () => this.$store.commit('showLoader'),
      hide: () => this.$store.commit('hideLoader')
    }
  }
})
