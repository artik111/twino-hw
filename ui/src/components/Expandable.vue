<template>
<div>
    <div class="is-flex-direction-row is-flex is-justify-content-space-between">
        <div class="group-title has-text-primary has-text-weight-regular">{{group && group.title || ''}}</div>
        <button class="button is-primary is-inverted right" v-on:click="toggle()">
        <span class="icon is-small" v-show="showMore">
            <i class="fas fa-minus"></i>
        </span>
        <span class="icon is-small" v-show="!showMore">
            <i class="fas fa-plus"></i>
        </span>
        <span>{{ showMore ? 'Show less' : 'Show more' }}</span>
        
        </button>
    </div>
    <div class="more-section" v-show="showMore">
      <div v-for="(item, index) in group.questions" :key="index" class="is-flex is-flex-direction-column is-align-content-flex-start">
        <div class="question is-flex is-flex-direction-row is-align-content-flex-start" >{{item.question}}</div>
        <div class="answer is-flex is-flex-direction-row is-align-content-flex-start has-text-grey-light">
            {{item.answer}}
          <span class="icon pointer ml-2" v-on:click="editable ? editable = undefined : editable = index">
            <i class="fas fa-edit"></i>
          </span>
        </div>
        <div v-show="editable === index">
          <div class="control is-flex is-flex-justify-content-start my-2" v-for="answer in item.answers" v-bind:key="answer">
            <label class="radio">
              <input type="radio" :name="item.question" v-on:click="setAnswer(answer, item)">
                  {{answer}}
            </label>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Expandable',
  props: {
    msg: String,
    group: {},
  },
  data() {
    return {
      showMore: false,
      editable: false,
    }
  },
 
  methods: {
    toggle() {
      this.showMore = !this.showMore;
    },
    setAnswer(answer, question) {
      let index = this.rawQuestions.findIndex((item => item.question === question.question));
      let tempQuestions = this.rawQuestions;
      tempQuestions[index]['answer'] = answer
      this.$store.commit('setAnswers', tempQuestions)
      this.editable = undefined
    },
  },
  computed: {
    ...mapGetters([
      'rawQuestions',
    ]),
  },
}
</script>

<style scoped>
.right {
    float: right;
}
.question {
  font-weight: bold;
  padding-top: 30px;
}

.question, .answer {
  text-align: left;
}
.more-section {
  padding-bottom: 40px;
}

.group-title {
  line-height: 41px;
}

.pointer {
  cursor: pointer;
}
</style>
