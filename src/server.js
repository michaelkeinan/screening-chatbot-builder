import { createServer, Model, Serializer } from 'miragejs'
import { MOCK_SERVER_URL } from './common/constants.js'
import chats from './store/mockData/chats.json'
import questions from './store/mockData/questions.json'
import answers from './store/mockData/answers.json'

export const makeServer = ({ environment = 'development' } = {}) => {
  const server = createServer({
    environment,

    serializers: {
      application: Serializer.extend({
        root: false,
        embed: true
      })
    },

    models: {
      chats: Model,
      questions: Model,
      answers: Model,
    },

    seeds (server) {
      loadQuestions(server),
      loadChats(server),
      loadAnswers(server)
    },

    routes () {
      this.namespace = ''
      this.urlPrefix = MOCK_SERVER_URL

      this.get('/chats', (schema) => {
        return schema.chats.all()
      })
      this.get('/questions', (schema) => {
        return schema.questions.all()
      })
      this.get('/answers', (schema) => {
        return schema.answers.all()
      })
      this.passthrough()
    },
  })

  return server
}


const loadQuestions = (server) => {
  questions.forEach(question => {
    server.create('question', question)
  })
}

const loadChats = (server) => {
  chats.forEach(chat => {
    server.create('chat', chat)
  })
}

const loadAnswers = (server) => {
  answers.forEach(answer => {
    server.create('answer', answer)
  })
}
