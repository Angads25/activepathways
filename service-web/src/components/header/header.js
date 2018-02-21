export default {
  name: 'Header',
  data () {
    return {
      type:0
    }
  },
  computed : {
    showHeader(){
      // return this.$route.name !== "dashboard ?? challengestates"
      return (this.$route.name === 'challengestates') || (this.$route.name === 'dashboard')
    }
  }
}
