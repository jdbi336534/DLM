import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
    // ip: 'http://172.16.1.34:8011',
    ip: '/api',
    userInfo: {},
    inputdisable: true, // 是否要失去焦点验证
}

// getters
const getters = {

}

// actions

// mutations
const mutations = {
    [types.SET_IP](state, { id }) {

    },
    [types.USER_INFO](state, data) {
        state.userInfo = data;
    },
    [types.CHECK_FLAG](state, flag) {
        state.inputdisable = flag;
    },
}

export default {
    state,
    getters,
    mutations
}
