import Vue from 'vue'
import Vuex from 'vuex'
import chats from './modules/chats.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    chats,
  },
})

export default store
