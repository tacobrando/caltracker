import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import VuePageTransition from 'vue-page-transition'
 
Vue.use(VuePageTransition)

Vue.config.productionTip = false
let app = null;
// wait for firebase auth to init before creating the app
  firebase.auth().onAuthStateChanged(() => {
    // init app if not already created
    if(!app){
        app = new Vue({
          router,
          store,
          vuetify,
      render: function (h) { return h(App) }
    }).$mount('#app')
  }
})