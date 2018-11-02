// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store.js'
const fb = require('./firebase.js')
import  './assets/scss/app.scss'


Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(user => {
  if(!app){
    
      /* eslint-disable no-new */
      app = new Vue({
        el: '#app',
        router,
        components: { App },
        store,
        template: '<App/>'
      })
  }
})

