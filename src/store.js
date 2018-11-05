import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebase')
Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('SET_CURRENT_USER', user)
        store.dispatch('fetchUserProfile')

        // realtime updates from our posts collection
        fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
            let postsArray = []

            querySnapshot.forEach(doc => {
                let post = doc.data()
                post.id = doc.id
                postsArray.push(post)
            })

            store.commit('SET_POST', postsArray)
        })
    }
})

/**
 * We dispatch an action and commit a  mutation
 */
export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: { },
        posts: []
    },
    actions: {
            fetchUserProfile({ commit, state}){
                fb.usersCollection.doc(state.currentUser.uid).get()
                .then(res => {
                    commit('SET_USER_PROFILE', res.data())
                }).catch(err => {
                    console.log(err)
                })
            },
            clearData( { commit }){
                commit('SET_USER_PROFILE', { })
                commit('SET_CURRENT_USER', null)
                commit('SET_POST', null)
            }
    },
    mutations: {
            SET_USER_PROFILE(state, val){
                state.userProfile = val
            },
            SET_CURRENT_USER(state, val){
                state.currentUser = val
            },
            SET_POST(state, val){
                state.posts = val
            }
    },
    getters: {
        
    }
})