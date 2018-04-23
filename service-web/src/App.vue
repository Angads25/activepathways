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
    data () {
      return {
        timeOut: 0
      }
    },
    created () {
      this.$loader.show()
      this.$store.dispatch('fetchAuthFromLocal')
        .then(resp => {
          console.log('in fetch from local')
          this.$loader.hide()
          if (['landingpage'].indexOf(this.$route.name) > -1) {
            this.$router.push({
              name: 'dashboard'
            })
          }
          console.log('after pushing to dashboard')
        })
        .catch(err => {
          console.log('in error')
          console.log(err);
          this.$loader.hide();
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
      responseError () {
        console.log(this.responseError);
        if (this.responseError.intercept) {
          this.responseError.intercept(this.responseError.error)
        } else {
          swal({
            type: 'error',
            title: 'Error',
            text: this.responseError.error
          })
        }
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

  .moonGrey {
    color: #dfe9f5;
  }

</style>
