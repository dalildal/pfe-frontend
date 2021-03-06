import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCpJaV7MNO35A2RQOmuyy0cvq0mk346kVE",
    libraries: 'places',
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

console.log('script loader');
/*
async function getData() {
  let url = 'https://vinci-market-back.herokuapp.com/';
  let resp = await fetch(url);
  return await resp.json();
}

window.onload = () => {
  async function run() {
    let data = await getData();
    console.log(data);
  }
  run(); run
}
*/
