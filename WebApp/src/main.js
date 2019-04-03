import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

import Default from './layouts/Default'
import Empty from './layouts/Empty'

Vue.component('default-layout', Default);
Vue.component('empty-layout', Empty);

Vue.prototype.$log = false;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');
