import Vue from 'vue'
import App from './App.vue'
import VueAxios from "vue-axios";
import apiCall from './axios/index';
import endpoints from './axios/endpoints';

Vue.config.productionTip = false
Vue.use(VueAxios);
Vue.prototype.$apiCall = apiCall;
Vue.prototype.$apiBus = endpoints;

new Vue({
  render: h => h(App),
}).$mount('#app')
