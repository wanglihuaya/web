import { getSpecsList, getSpecsCount } from "../../../tools/axios";
const state = {
  specsList: [],
  size: 2, //条数
  page: 1, // 页码
  countNum: 0 //总条数
};

const getters = {
  getSpecsList(state) {
    return state.specsList;
  },
  getSpecsSize(state) {
    return state.size;
  },
  getCountNum(state) {
    return state.countNum;
  }
};

const mutations = {
  req_specsList(state, payload) {
    state.specsList = payload;
  },
  req_count(state, payload) {
    state.countNum = payload;
  },
  change_page(state, payload) {
    state.page = payload;
  }
};

const actions = {
  //获取规格列表
  getSpecsListAction(payload) {
    getSpecsList({
      size: payload.state.size,
      page: payload.state.page
    }).then(res => {
      if (res.data.code === 200) {
        let list = res.data.list ? res.data.list : [];
        payload.commit("req_specsList", list);
        if (payload.state.page != 1 && list.length == 0) {
          payload.dispatch("changePageAction", payload.state.page - 1);
          return;
        }
      }
    });
  },
  getCountAction(payload) {
    getSpecsCount().then(res => {
      if (res.data.code === 200) {
        payload.commit("req_count", res.data.list[0].total);
      }
    });
  },
  changePageAction(context, payload) {
    context.commit("change_page", payload);
    context.dispatch("getSpecsListAction");
  }
};

//导出这个模块

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
