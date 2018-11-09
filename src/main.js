import Vue from 'vue'
import App from './App.vue'

import VModal from 'vue-js-modal';

// Register vue-js-modal plugin
Vue.use(VModal);

//
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
