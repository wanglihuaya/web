import Vue from 'vue'
import Vuex from 'vuex'
import {getvList} from '../tools/index'

Vue.use(Vuex)
console.log('Vuex:::::', Vuex)

export default new Vuex.Store({
  state: {
    name: 'COMMANDS',
    num: 1,
    vlist: []
  },
  mutations: {
    changeOh (state, payload) {
      state.name = payload
    },
    fork_data (state) {
      state.num = state.num + 1
    },
    req_vlist (state, payload) {
      state.vlist = payload
    }

  },
  actions: {
    /* N个行动 */
    // forkData (option) {
    //   console.log('option:::::', option)
    //   option.commit('changeGo')
    // }
    forkData ({ commit }) {
      commit('fork_data')
    },
    getvList1 ({commit}) {
      getvList()
        .then(res => {
          console.log('列表:::::::', res)
          if (res.status === 200) {
            commit('req_vlist', res.data)
          }
        })
        .catch(err => {
          console.log(err, '错误捕获')
        })
    }
  },
  getters: {
    getName (state) {
      return state.name
    }
  }
})
