import { getGoodsList, getGoodsCount } from "../../../tools/axios";

const state = {
  goodsList: [],
  size: 2,
  page: 1,
  countNum: 0
};

const getters = {
  getGoodsList(state) {
    return state.goodsList;
  },
  getGoodsSize(state) {
    return state.size;
  },
  getCountNum(state) {
    return state.countNum;
  }
};

const mutations = {
  req_goodsList(state, payload) {
    state.goodsList = payload;
  },
  req_count(state, payload) {
    state.countNum = payload;
  },
  change_page(state, payload) {
    state.page = payload;
  }
};

const actions = {
  getGoodsListAction(payload) {
    getGoodsList({
      size: payload.state.size,
      page: payload.state.page
    }).then(res => {
      if (res.data.code === 200) {
        let list = res.data.list ? res.data.list : [];
        payload.commit("req_goodsList", list);
        if (payload.state.page != 1 && list.length == 0) {
          payload.dispatch("changePageAction", payload.state.page - 1);
          return;
        }
      }
    });
  },
  getCountAction(payload) {
    getGoodsCount().then(res => {
      if (res.data.code === 200) {
        payload.commit("req_count", res.data.list[0].total);
      }
    });
  },
  changePageAction(context, payload) {
    context.commit("change_page", payload);
    context.dispatch("getGoodsListAction");
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
