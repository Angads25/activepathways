import {UserService} from "../../../services/user";

export default {
  name: 'Done',
  l_rating: '',
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
  data() {
    return {
      notes: '',
      saveFlag: false
    }
  },
  created() {
    this.l_rating = this.challengeData['rating']
    this.notes = this.challengeData['notes']
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
    rating () {
      return this.challengeData['rating']
    },
    dayNum () {
      console.log('>>>>>>>>',this.programmeData,this.challengeData)
      let idx = -1;
      for (let i = 0; i < (this.programmeData || []).length; i++) {
        if (this.programmeData[i].id === this.challengeData.id) {
          idx = i
          break
        }
      }
      console.log('>>>>>>',idx)
      return idx + 1
    }
    // ,
    // rating () {
    //   console.log('in computed propertty lrating is',this.l_rating)
    //   console.log("in computed property,challengeDAta",this.challengeData['rating'])
    //   return this.l_rating==='' ? this.challengeData['rating'] : this.l_rating
    // }
  },
  methods: {
    changeStatus() {
      if (this.notesStatus === 'Add') {
        this.saveFlag = true
        // focus
        setTimeout(function () {
          document.querySelector('#comment').focus()
        }, 200)
      } else {
        const challengeData = {...this.challengeData}
        challengeData['notes'] = this.notes
        if (this.challengeData['user']['id']) {
          console.log('151515', 'hit api')
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
      this.l_rating = rating
      console.log('>>>>>rating clicked', rating)
      console.log('>>>>>lrating is', this.l_rating)
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
          this.l_rating = this.challengeData['rating']
          this.$notify.error({
            title: 'Error',
            message: 'Error updating happiness level'
          });
        })
      }
    }
  }
}
