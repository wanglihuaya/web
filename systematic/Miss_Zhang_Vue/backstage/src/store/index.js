import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import menu from './modules/menu'
import role from './modules/role'
import manager from './modules/manager'
import sort from './modules/sort'
import specs from './modules/specs'
// import goods from './modules/goods'
export default new Vuex.Store({
  modules: {
    menu,
    role,
    manager,
    sort,
    specs
    // goods
  }
})
