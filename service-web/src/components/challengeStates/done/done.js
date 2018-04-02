export default {
  name: 'Done',
  props: {
    challengeData: {
      default() {
        return {}
      }
    },
    isChallengeDetail: {default: false}
  },
  data() {
    return {
      notes: '',
      notesStatus: 'Add'
    }
  },
  methods: {
    changeStatus () {
      if(this.notesStatus==='Add') {
        this.notesStatus='Save'
      }
      if(this.notes!=='')
      {
        console.log('151515','hit api')
      }
    }
  }
}
