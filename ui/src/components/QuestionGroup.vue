<template>
<div>
    <div class="is-size-4 has-text-primary has-text-weight-bold has-text-left mb-2" v-show="surveyStarted || surveyFinished">Suitability Test</div>
        <div class="questions-bars" v-show="surveyStarted || surveyFinished">
            <div class="row">
            <div class="columns is-mobile mb-3">
                <div class="column custom" v-for="item in items" :key="item">
                    <progress class="col progress is-success" :value="getGroupPercentage(item)" v-bind:class="currentGroup === item.title ? 'current-group' : 'inactive-group'" v-bind:key="answers" max="100"></progress>
                </div>
            </div>
            <div class="is-flex is-flex-direction-row is-justify-content-space-between is-size-7 has-text-grey-light mb-5" v-if="!surveyFinished && surveyStarted">
                <div class="has-text-primary has-text-weight-semibold">{{currentGroup}}</div>
                <div>{{totalProgress}} completed</div>
            </div>
            <div class="question-section" v-for="(question, index) in rawQuestions" v-bind:key="question.question" v-show="index === currentQuestion && !surveyFinished && surveyStarted">
                <Question :question="question" :questions="rawQuestions" @answered="notAnswered = false"></Question>
                <div class="column is-flex is-flex-direction-column">
                    <div class="notification is-danger is-light error-box" v-show="notAnswered && nextClicked">  
                        Please provide answer
                    </div>
                    <button class="button is-primary" v-on:click="clickNext" v-if="currentQuestion < totalQuestions - 1">Next question</button>
                    <button class="button is-success" v-on:click="finishSurvey" v-else>Finish survey</button>
                    <button class="button previous is-primary is-inverted" v-on:click="clickPrevious">Previous question</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Question from './Question.vue'

export default {
  name: 'QuestionGroup',
  components: {
    Question
  },
  props: {
    msg: String,
    questions: {},
  },
  data() {
    return {
        answer: '',
        notAnswered: true,
        nextClicked: false,
    }
  },
  mounted() {
    //   this.getEvents()
  },
  methods: {
    getGroupPercentage(group) {
        let groupTotal = (this.rawQuestions.filter(item => item.group === group.title)).length
        let numberAnswered = (this.answers.filter(item => item.group === group.title)).length
        console.log(numberAnswered, group, this.answers, 'numberAnswered')
        return numberAnswered * 100 / groupTotal
    },
    clickNext() {
        this.nextClicked = true
        if(!this.notAnswered) this.nextQuestion()
    },
    clickPrevious() {
        this.previousQuestion()
        this.$nextTick(() => {
            this.notAnswered = false
        })
    },
    ...mapMutations(['nextQuestion', 'previousQuestion', 'finishSurvey'])
  },
  computed: {
    items() {
        return this.$store.state.survey
    },
    totalProgress() {
    return Math.ceil(this.answers.length * 100 / this.totalQuestions) + '%'
    },
    currentGroup() {
        return this.rawQuestions && this.rawQuestions[this.currentQuestion]['group']  || 'none'
    },
    ...mapGetters([
      'totalQuestions',
      'answers',
      'currentQuestion',
      'rawQuestions',
      'surveyFinished',
      'surveyStarted',
    ]),
  },
  watch: {
      currentQuestion() {
        this.notAnswered = true
        this.nextClicked = false
      },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col.progress {
    height: 5px;
}
.error-box {
    color: black !important;
    border: 1px solid red;
}
.button.previous {
    text-decoration: underline;
}

.current-group {
    background: rgba(93, 255, 0, 0.19) !important;
}

.inactive-group {
    background: rgba(82, 83, 91, 0.16) !important;
}

.custom {
    padding: 3px;
}

.columns.is-mobile {
    margin: unset;
}
.notification.is-danger.is-light.error-box {
    padding: 0.5rem 2.5rem 0.5rem 1.5rem
}
</style>
