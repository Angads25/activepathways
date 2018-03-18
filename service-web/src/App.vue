<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Loader v-if="showLoader"></Loader>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import Header from '@/components/header/header.vue'
import Loader from '@/components/loader/loader.vue'
export default {
  name: 'App',
  components: {Header, Loader},
  created () {
    this.$loader.show()
    this.$store.dispatch('fetchAuthFromLocal')
      .then(resp => {
        this.$loader.hide()
        this.$router.push({
          name: 'dashboard'
        })
      })
      .catch(err => {
        this.$loader.hide()
        console.log(err)
        this.$router.push({
          name: 'landingpage'
        })
      })
  },
  computed: {
    isLoggedIn () {
      return !!this.$store.state.auth.authToken
    },
    responseError () {
      return this.$store.state.ui.responseError
    },
    showLoader () {
      return this.$store.state.ui.show_loader
    }
  },
  watch: {
    '$route' (to, from) {
      const flag = ['landingpage'].indexOf(to.name)
      if (flag > -1 && !this.isLoggedIn) {
        this.$router.push({
          name: 'landingpage'
        })
      } else if (flag === -1 && this.isLoggedIn) {
        this.$router.push({
          name: 'dashboard'
        })
      }
    },
    responseError () {
      console.log(this.responseError)
      swal({
        type: 'error',
        title: 'Error',
        text: this.responseError.error
      })
    }
  }
}
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #fff;
  }
</style>
