import ProgramHeader from '@/components/programHeader/programHeader.vue'
export default {
  name: 'ProgramCatalogue',
  data() {
    return {
      options: [
        {
          id: 'back-top-title',
          label: 'BackTop'
        }
      ]
    }
  },
  components: {
    ProgramHeader
  }

}
