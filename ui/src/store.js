import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      survey: '',
      surveyStarted: false,
      surveyFinished: false,
      totalQuestions: null,
      answeredQuestions: null,
      currentQuestion: 0,
    }
  },
  mutations: {
    setSurvey (state, payload) {
      state.survey = payload
    },
    startSurvey (state, payload) {
      state.surveyStarted = payload
    },
    setTotal (state, payload) {
      state.totalQuestions = payload
    },
    setAnswers (state, payload) {
      state.answeredQuestions = payload
    },
    setCurrentQuestion (state, payload) {
      state.currentQuestion = payload
    },
    nextQuestion (state) {
      state.currentQuestion += 1
    },
    previousQuestion (state) {
      state.currentQuestion -= 1
    },
    finishSurvey (state) {
      state.surveyFinished = true
      state.surveyStarted = false
    },
  },
  getters: {
    getSurvey (state) {
      return state.survey
    },
    surveyStarted (state) {
      return state.surveyStarted
    },
    surveyFinished (state) {
      return state.surveyFinished
    },
    totalQuestions (state) {
      return state.totalQuestions
    },
    answers (state) {
      return state.answeredQuestions && state.answeredQuestions.filter(item => item.answer) || []
    },
    rawQuestions (state) {
      return state.answeredQuestions
    },

    currentQuestion (state) {
      return state.currentQuestion
    },
  }
})