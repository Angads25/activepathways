import {UserService} from "../../../services/user";

export default {
  name: 'NotDone',
  props: {
    challengeData: {
      default() {
        return {}
      }
    },
    programmeData: {
      default () {
        return {}
      }
    },
    isChallengeDetail: {default: false}
  },
  created() {
    l_rating=this.challengeData['rating']
  },
  data() {
    return {
      notes: '',
      saveFlag: false,
      l_rating: ''
    }
  },
  watch: {
    challengeData() {
      this.notes = this.challengeData['notes']
    }
  },
  computed: {
    notesStatus() {
      return this.challengeData['notes'] ? 'Update' : (this.saveFlag ? 'Save' : 'Add')
    },
    dayNum () {
      let idx = -1;
      for (let i = 0; i < (this.programmeData || []).length; i++) {
        if (this.programmeData[i].id === this.challengeData.id) {
          idx = i
          break
        }
      }
      return idx + 1

    }

  },
  methods: {
    changeStatus() {
      if (this.notesStatus === 'Add') {
        this.saveFlag = true
      } else {
        console.log('151515', 'hit api')
        const challengeData = {...this.challengeData}
        challengeData['notes'] = this.notes
        if (this.challengeData['user']['id']) {
          UserService.updateUserChallengeById(challengeData).then((response) => {
            this.$emit('challengeUpdated', response)
            this.$notify({
              title: 'Success',
              message: 'Notes updated',
              type: 'success'
            });
          }).catch(err => {
            this.$notify.error({
              title: 'Error',
              message: 'Error updating notes'
            });
          })
        }
      }
    },
    setRating(rating) {
      this.l_rating=rating
      const challengeData = {...this.challengeData}
      challengeData['rating'] = rating
      if (this.challengeData['user']['id']) {
        UserService.updateUserChallengeById(challengeData).then((response) => {
          this.$emit('challengeUpdated', response)
          const h = this.$createElement;
          this.$notify({
            title: 'Success',
            message: 'Happiness level updated',
            type: 'success'
          })
        }).catch(err => {
          this.l_rating=this.challengeData['rating']
          this.$notify.error({
            title: 'Error',
            message: 'Error updating happiness level'
          });
        })
      }
    }
  }
}
