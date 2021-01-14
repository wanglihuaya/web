const state = {
  name: 'Five Hundred miles！！'
}

const getters = {
  getName (state) {
    return state.name
  }
}

const mutations = {

}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions,
  //命名空间
  namespaced: true
}