/* 引入接口文件 */
import {getMenuList} from '../../../tools/axios'
const state = {
  menuList: []
}

const getters = {
  getMenuList (state) {
    return state.menuList
  }
}

const mutations = {
  req_menuList (state, payload) {
    state.menuList = payload
  }
}

const actions = {
  getMenuListAction ({commit}) {
    getMenuList()
      .then(response => {
        if (response.data.code === 200) {
          commit('req_menuList',response.data.list);
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