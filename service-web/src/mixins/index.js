import Vue from 'vue'

Vue.mixin({
  created: function () {
    this.$modal = {
      show: (content) => this.$store.commit('showModal', content),
      hide: () => this.$store.commit('hideModal')
    }
  }
})
