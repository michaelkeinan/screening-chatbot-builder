import { QUESTION_TYPE_ID_TO_QUESTION_TYPE_MAP, QUESTION_TYPE } from "../../common/constants.js"

const getSortedQuestionsByOrder = (questionsList) => questionsList.sort((a, b) => a.order- b.order)

const mapStructuredAnswersById = (answersList) => answersList.reduce((answersMap, currentAnswer) => {
    if (currentAnswer.range) {
        currentAnswer.qids.forEach(qid => {
            answersMap[qid] = {
                range: currentAnswer.range
            }
        })
    } else {
        currentAnswer.qids.forEach(qid => {
            answersMap[qid] = answersMap[qid] ? [...answersMap[qid], currentAnswer.atext] : [currentAnswer.atext]
        })
    }

    return answersMap
}, {})

const mapQuestionsById = (questionsList, structuredAnswersMap) => questionsList.reduce((questionsMap, currentQuestion) => {
    const questionType = QUESTION_TYPE_ID_TO_QUESTION_TYPE_MAP[currentQuestion.qtype]

    questionsMap[currentQuestion.qid] = {
        id: currentQuestion.qid,
        type: currentQuestion.qtype,
        text: currentQuestion.qtext,
        ...(questionType ===  QUESTION_TYPE.MULTI_CHOICE && { answers: structuredAnswersMap[currentQuestion.qid] }),
        ...(questionType ===  QUESTION_TYPE.NUMERIC && { range: structuredAnswersMap[currentQuestion.qid].range }),
    }

    return questionsMap
}, {})

export const mapChatsById = (chatsList, questionsList, answersList) => {
    const structuredAnswersMap = mapStructuredAnswersById(answersList)
    const questionsMap = mapQuestionsById(questionsList, structuredAnswersMap)
    return chatsList.reduce((chatsMap, currentChat)=> {
        const chatId = currentChat.chatID
        if (chatsMap.chatId) {
          console.log(`Duplicated chat id ${chatId}. Ignoring.`)
          return chatsMap
        }
        const sortedQuestions = getSortedQuestionsByOrder(currentChat.questions)
        const chat = sortedQuestions.map(question => questionsMap[question.qid])
        chatsMap[chatId] = chat
        return chatsMap
      }, {})
}