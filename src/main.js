import Vue from 'vue'
import App from './App.vue'
import VTooltip from 'v-tooltip'
import router from './router'
import store from './store/index'
import i18n from './services/i18n.js'
import { makeServer } from './server.js'

Vue.config.productionTip = false

Vue.use(VTooltip)

makeServer()

new Vue({
  render: h => h(App),
  router,
  store,
  i18n,
}).$mount('#app')
