<template>
  <div
    class="background-grid">
    <app-bar />
    <router-view
      v-if="isChatsLoaded"
      :key="$route.fullPath" />
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

import '../styles/normalize.css'
import '../styles/app.css'
import '../styles/tooltip.css'

import AppBar from '../components/AppBar/index.vue'

export default {
  name: 'AppContainer',

  components: {
    AppBar,
  },

  created () {
    this.fetchChatbotData()
  },

  computed: {
    ...mapGetters([
        'getChatIdsList',
    ]),
    isChatsLoaded () {
      return this.getChatIdsList().length > 0
    }
  },

  methods: {
    ...mapActions([
      'fetchChatbotData',
    ]),
  },

}
</script>
