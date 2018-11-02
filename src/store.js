import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebase')
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: { }
    },
    actions: {

    },
    mutations: {

    },
    getters: {
        
    }
})