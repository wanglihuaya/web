import { getBannerList } from "../../../tools/axios";

const state = {
  bannerList: []
};
const getters = {
  getBannerList(state) {
    return state.bannerList;
  }
};
const mutations = {
  REQ_BANNER(state, payload) {
    state.bannerList = payload;
  }
};
const actions = {
  getBannerListAction({ commit }) {
    getBannerList()
      .then(res => {
        commit("REQ_BANNER", res.data.list);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
