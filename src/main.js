import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import '@/assets/css/icon.css'
import '@/assets/css/Stylereset.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/fonts/fontsss.css'

import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.use(Vant);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
