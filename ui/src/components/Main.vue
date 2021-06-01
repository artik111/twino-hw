<template>
  <div class="main" v-if="surveyStarted || surveyFinished">    
    <QuestionGroup :questions="questions" class="main-container" ></QuestionGroup>
  </div>
  <div v-if="surveyFinished">
    <Overview />
  </div>
  <div v-else> 
    <button class="button is-large is-primary start-survey" v-on:click="startSurvey(true)" v-if="!surveyStarted && !surveyFinished">Start survey</button>
  </div>
</template>

<script>
import axios from "axios"
import { useStore } from 'vuex'
import { mapGetters } from 'vuex'
import QuestionGroup from './QuestionGroup.vue'
import Overview from './Overview.vue'




export default {
  name: 'Main',
  components: {
    QuestionGroup,
    Overview
  },
  props: {
    msg: String
  },
  data() {
    return {
        data: null,
        count: 0,
        questions: [],
    }
  },
  async mounted() {
      const response = await this.getEvents()
      this.setSurvey(response)
      console.log(this.$store.state.survey)
      response.forEach(item => {
          this.count += item.questions.length
      })
      this.totalQuestions(this.count)

      response.forEach(item => {
          item.questions.forEach(item2 => {
              console.log(item2, item.title)
              item2['group'] = item.title
              this.questions = [...this.questions, item2]
          })
      })
      this.setAnwers(this.questions)
  },
  setup () {
    const store = useStore()

    return {
      setSurvey: (payload) => store.commit('setSurvey', payload),
      startSurvey: (payload) => store.commit('startSurvey', payload),
      totalQuestions: (payload) => store.commit('setTotal', payload),
      setAnwers: (payload) => store.commit('setAnswers', payload),
    }
  },
  methods: {
    async getEvents() {
      let res = await axios.get("http://localhost:3001/suitability", { crossdomain: true });
      return res.data.groups;
    },
  },
  computed: {
    ...mapGetters([
      'surveyFinished',
      'surveyStarted',
    ]),
  }
}
</script>

<style scoped>

.main {
    margin: auto;
    max-width: 80vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.main .progress {
  height: 5px;
  width: 100px;
}

.main-container {
  width: 80vw;
}
</style>
