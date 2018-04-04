import Vue from 'vue'
import moment from 'moment'

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
  },
  methods: {
    $differenceDays (d1, d2) {
      return moment(d1).startOf('day').diff(moment(d2).startOf('day'), 'days')
    }
  }
})
