import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
console.log('Vuex::::', Vuex)


import hello from './hello/hello'
import rank from './rank/rank'
export default new Vuex.Store({
  state: {
    name: 'COMMANDS',
    go: 'oooooooooooook'
  },
  getters: {
   
  },
  mutations: {

  },
  actions: {
    
  },
  modules: {
    hello,
    rank
  }
})

