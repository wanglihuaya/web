import {getSortList} from '../../../tools/axios/index'
const state = {
    sortList:[]
}
const getters ={
    getSortList(state){
        return state.sortList
    }
}
const mutations ={
    req_sortList(state,payload){
        state.sortList= payload
    }
}
const actions = {
    getSortListAction({commit}){
        getSortList()
        .then(res=>{
            if(res.data.code===200){
                commit('req_sortList',res.data.list)
            }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}
