// import axios from 'axios'
import { getCookie,setCookie } from '@/util/auth'

const state = {
  user: getCookie('user')
}

const getters = {
  user(state) {
    return state.user;
  }
}

const actions = {
  setUser({commit},param) {
    commit('SET_USER', param);
  }
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
    setCookie('user', user)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
