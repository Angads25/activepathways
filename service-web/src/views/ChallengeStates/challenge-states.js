import OnHold from '@/components/challengeStates/onHold/onHold.vue'
import Doing from '@/components/challengeStates/doing/doing.vue'
import Skipped from '@/components/challengeStates/skipped/skipped.vue'
import Done from '@/components/challengeStates/done/done.vue'
import NotDone from '@/components/challengeStates/notDone/notDone.vue'
import NoCheckIn from '@/components/challengeStates/noCheckIn/noCheckIn.vue'

export default {
  name: 'ChallengeStates',
  components: {
    OnHold,
    Doing,
    Skipped,
    Done,
    NotDone,
    NoCheckIn
  },
  data () {
    return {
      challengeData: JSON.parse('{"id":"5aba7d1a4dafb40f9cdaa880","notes":"","status":"PENDING","createdAt":null,"programme":{"name":"Starter programme"},"challenge":{"name":"Identify opportunities to move","shortDescription":"Take occasional moments to stop and cultivate awareness of what you are doing. Instead of going through your daily motions on autopilot, start practicing awareness.","description":"Getting awareness of our current behaviours is the first step to replacing them with new ones, and for this purpose it is essential to identify cues and triggers that start our habits.\\r\\nOur habits are influenced by our environment. \\r\\nYour wellbeing not only depends on how much you exercise, but how much physical activity you perform during the day, how long you spend sitting and the quality of your sleep.\\r\\nA study reported in the Journal of Clinical Nutrition found that short bouts of exercise, just three minutes at a time, for a total of 30 minutes a day, lowered several measures of cardiac risk as effectively as one continuous 30-minute session.","highlightedContent":"Being active (or inactive) is a consequence of our behaviours and habits.","illustration":{"width":286,"height":243,"format":"png","resource_type":"image","url":"https://res.cloudinary.com/drj4dg734/image/upload/v1521803863/flbrjw2fgqsgcfdi6v31.png","secure_url":"https://res.cloudinary.com/drj4dg734/image/upload/v1521803863/flbrjw2fgqsgcfdi6v31.png"}},"user":{"createdAt":"Tue Mar 27 2018 22:49:16 GMT+0530 (IST)"},"challengeDate":"Wed Mar 28 2018 22:49:16 GMT+0530 (IST)"}')
    }
  }
}
