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
        _self.percentage += 10
      }, 1000)
    }
  },
  destroy () {
    clearInterval(this.interval)
  }
}
