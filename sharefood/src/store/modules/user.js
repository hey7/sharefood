import types from '../types.js'
import config from '../../util/config'
import axios from 'axios'

const state = {
  user: {},
  islogin: false
}

const getters = {
  user(state) {
    return state.user;
  },
  islogin(state) {
    return state.islogin;
  }
}

const actions = {
  getUser({commit}, username) {
      if (username != null) {
            axios.post(config.SREVER_HTTP + "/user/getUser", 'username=' + username)
              .then(res => {
                if (res.data.code == 106) { //获得用户成功
                  commit(types.GET_USER, res.data.data);
                }
              });
      }else{
        commit(types.GET_USER, null);
      }
  }
}

const mutations = {
  [types.GET_USER](state, user) {
    if (user != null) {
      state.user = user
      state.islogin = true
    } else {
      state.user = {}
      state.islogin = false
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
