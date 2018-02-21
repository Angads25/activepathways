export default {
  name: 'Header',
  data () {
    return {
      type:0
    }
  },
  computed : {
    showHeader(){
      return this.$route.name !== "dashboard"
    }
  }
}
