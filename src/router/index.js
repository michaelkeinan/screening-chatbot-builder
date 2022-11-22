import Vue from 'vue'
import Router from 'vue-router'
import ScreeningChatbotBuilder from '../views/ScreeningChatbotBuilder.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recruiter/screening-chatbot-builder',
      name: 'screeningChatbotBuilder',
      component: ScreeningChatbotBuilder,
    },
    // Redirect any unmatched routes
    {
      path: '*',
      redirect: '/recruiter/screening-chatbot-builder'
    }
  ]
})
