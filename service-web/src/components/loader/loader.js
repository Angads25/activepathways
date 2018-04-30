export default {
  name: 'Loader',
  data () {
    return {
      percentage: 0,
      interval: 0
    }
  },
  created () {
    this.percentage = 0
    this.incPercentage()
  },
  methods: {
    incPercentage () {
      const _self = this
      if (this.interval) {
        clearInterval(this.interval)

      }
      setInterval(() => {
        if(_self.percentage <100) {
          _self.percentage += 10
        }
      }, 200)
    }
  },
  destroy () {
    clearInterval(this.interval)
  }
}
