// import Vue from 'vue'
import { MOCK_SERVER_URL } from '../../common/constants.js'
import { mapChatsById } from './chatsHelper.js'

const state = {
    chatsMap: {},
    questionsMap: [],
}

const getters = {
  getChatbyId: state => (chatId) => state.chatsMap[chatId],
  getChatIdsList: state => () => Object.keys(state.chatsMap)
}

const mutations = {
}

const actions = {
    async fetchChatbotData ({ state }) {
        try {
          const chatsRes = await fetch(`${MOCK_SERVER_URL}/chats`)
          if (!chatsRes.ok) {
            throw Error(`Unable to fetch chats data`)
          }
          const chatsList = await chatsRes.json()

          const questionsRes = await fetch(`${MOCK_SERVER_URL}/questions`)
          if (!questionsRes.ok) {
            throw Error(`Unable to fetch questions data`)
          }
          const questionsList = await questionsRes.json()
          
          const answersRes = await fetch(`${MOCK_SERVER_URL}/answers`)
          if (!answersRes.ok) {
            throw Error(`Unable to fetch answers data`)
          }
          const answersList = await answersRes.json()

          state.chatsMap = mapChatsById(chatsList, questionsList, answersList)
          // console.log(`chatsMap:\n${JSON.stringify(state.chatsMap)}`)
        } catch (error) {
          console.log(`Error in fetchChatbotData: ${error}`)
        }
      },
}

export default {
    state, getters, mutations, actions
}