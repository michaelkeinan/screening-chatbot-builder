<template>
  <div
    class="question-container">
    <div
        class="question-text">
        {{ questionText() }}
    </div>
    <div
        v-if="isNumericQuestion()"
        class="structured-question">
        {{ rangeText() }}
    </div>
    <div
        v-else-if="isMultiChoiceQuestion()"
        class="structured-question multi-choice-answers">
        <div
            v-for="(answer, index) in question.answers"
            :key="index">
            {{ `(${index + 1}) ${answer}` }}
        </div>
    </div>
    <div
        v-else>
    </div>

  </div>
</template>

<script>

import { QUESTION_TYPE_ID_TO_QUESTION_TYPE_MAP, QUESTION_TYPE } from '../../common/constants.js'

export default {
    name: 'ChatQuestion',

    props: {
      question: {
        type: Object,
        required: true
      },
      questionNumber: {
          type: Number,
          required: true
      }
    },

    methods: {
        questionText () {
            return `${this.questionNumber}. ${this.question.text}`
        },
        isNumericQuestion () {
            return QUESTION_TYPE_ID_TO_QUESTION_TYPE_MAP[this.question.type] === QUESTION_TYPE.NUMERIC
        },
        rangeText () {
            return `(Numeric question - answer range from ${this.question.range.min} to ${this.question.range.max})`
        },
        isMultiChoiceQuestion () {
            return QUESTION_TYPE_ID_TO_QUESTION_TYPE_MAP[this.question.type] === QUESTION_TYPE.MULTI_CHOICE
        },
    }

}
</script>

<style>
.question-container {
    margin-bottom: 1em;
}
.question-text {
    font-weight: bold;
}
.structured-question {
    margin-top: 0.4em;
    font-size: 1.8rem;
    font-weight: normal;
}
</style>