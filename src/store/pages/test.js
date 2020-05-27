import http from '@/http'

const state = {
  name:'',
}

const mutations = {
  setUserInfo(state,val){
    state.name = val.login.name;
  },
}

const actions = {
  async login({ commit }, val) {
    const login = new http('test',val);
    const data = await Promise.all([login.result])
    commit('setUserInfo', {
      login: data[0].data,
    })
    return data;
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};