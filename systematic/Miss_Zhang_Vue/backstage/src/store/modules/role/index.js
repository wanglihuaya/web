/* 引入接口文件 */
import {getRoleList} from '../../../tools/axios'
const state = {
  roleList: []
}

const getters = {
  getRoleList (state) {
    return state.roleList
  }
}

const mutations = {
  req_roleList (state, payload) {
    state.roleList = payload
  }
}

const actions = {
  getRoleListAction ({commit}) {
    getRoleList()
      .then(response => {
        if (response.data.code === 200) {
          commit('req_roleList',response.data.list);
        }
      })
      .catch((err => {
        console.error(err);
      }))
}
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}