<template>
    <div class="main">
        <div class="is-size-5 has-text-weight-bold has-text-left is-fullwidth">
            <div>Answers overview</div>
        </div>
        <div class="is-size-7 mt-4 mb-6 has-text-weight-semibold has-text-left is-fullwidth">
            <div>Here you can see and change your answers</div>
        </div>
        <div class="row fullwidth">
            <div class="row" v-for="group in getSurvey" :key="group.title">
                <Expandable :group="group"></Expandable>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
import Expandable from './Expandable.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Overview',
  components: {
    Expandable
  },
  props: {
    msg: String
  },
  data() {
    return {
        data: null,
    }
  },

    computed: {
    ...mapGetters([
      'totalQuestions',
      'answers',
      'currentQuestion',
      'getSurvey',
    ])
  },
}
</script>

<style scoped>

.main {
    margin: auto;
    width: 80%;
    display: flex;
}
.main .progress {
  height: 5px;
  width: 100px;
}

.is-size-5.has-text-weight-bold, .fullwidth, .is-size-7.mt-4.mb-6 {
    width: 100%;
}
</style>
