<template>
  <div class="hello">
    <div class="control is-flex is-flex-justify-content-start my-2 has-text-primary is-size-6 has-text-weight-bold has-text-left mb-4"> {{question.question}} </div>
    <div class="control is-flex is-flex-justify-content-start my-2" v-for="answer in question.answers" v-bind:key="answer">
        <label class="radio">
            <input type="radio" :name="question.question" v-on:click="setAnswer(answer)">
                {{answer}}
        </label>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Question',
  props: {
    msg: String,
    question: {},
    questions: {},
  },
  data() {
    return {
        answered: false,
        tempQuestions: '',
    }
  },
  mounted() {
        this.tempQuestions = this.questions
        console.log('questions', this.questions)
  },
  methods: {
      setAnswer(answer) {
          this.$emit('answered')
          this.answered = true
          let index = this.questions.findIndex((item => item.question === this.question.question));
          console.log(index, answer, 'setAnswer')
          this.tempQuestions[index]['answer'] = answer
          this.$store.commit('setAnswers', this.tempQuestions)
          console.log(this.$store.getters.answers)
      },
  },
}
</script>

<style scoped>
.radio {
    text-align: left;
}
</style>
