import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import menu from "./modules/menu";
import role from "./modules/role";
import manager from "./modules/manager";
import sort from "./modules/sort";
import specs from "./modules/specs";
import goods from "./modules/goods";
import member from "./modules/member";
import seckill from "./modules/seckill";
import banner from "./modules/banner";
export default new Vuex.Store({
  state: {
    loginInfo: sessionStorage.getItem("loginInfo")
      ? JSON.parse(sessionStorage.getItem("loginInfo"))
      : null
  },
  getters: {
    getUserInfo(state) {
      return state.loginInfo;
    }
  },
  mutations: {
    CHANGE_USER(state, payload) {
      state.loginInfo = payload;
      if (payload) {
        sessionStorage.setItem("loginInfo", JSON.stringify(payload));
      } else {
        sessionStorage.removeItem("loginInfo");
      }
    }
  },
  actions: {
    changeUserInfoAction(contxt, payload) {
      contxt.commit("CHANGE_USER", payload);
    }
  },
  modules: {
    menu,
    role,
    manager,
    sort,
    specs,
    goods,
    member,
    seckill,
    banner
  }
});
