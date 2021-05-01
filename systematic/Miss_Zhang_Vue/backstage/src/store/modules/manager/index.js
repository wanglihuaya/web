import { getManagerList, getManagerCount } from "../../../tools/axios/";
const state = {
  managerList: [],
  size: 2,
  page: 1,
  countNum: 0
};

const getters = {
  getManagerList(state) {
    return state.managerList;
  },
  getManageSize(state) {
    return state.size;
  },
  getCountNum(state) {
    return state.countNum;
  }
};

const mutations = {
  req_managerList(state, payload) {
    state.managerList = payload;
  },
  req_count(state, payload) {
    state.countNum = payload;
  },
  change_page(state, payload) {
    state.page = payload;
  }
};

const actions = {
  getManagerListAction(payload) {
    getManagerList({
      size: payload.state.size,
      page: payload.state.page
    }).then(res => {
      if (res.data.code === 200) {
        let list = res.data.list ? res.data.list : [];
        payload.commit("req_managerList", list);
        if (payload.state.page != 1 && list.length == 0) {
          payload.dispatch("changePageAction", payload.state.page - 1);
          return;
        }
      }
    });
  },
  getCountAction(payload) {
    getManagerCount().then(res => {
      if (res.data.code === 200) {
        payload.commit("req_count", res.data.list[0].total);
      }
    });
  },
  changePageAction(context, payload) {
    context.commit("change_page", payload);
    context.dispatch("getManagerListAction");
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
