import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './style.scss';
import router from './router'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
