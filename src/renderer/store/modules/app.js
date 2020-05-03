const state = {
  title: '',
  config: {}
}

const mutations = {
  setTitle (state, val) {
    state.title = val
  },
  setConfig (state, val) {
    state.config = val
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
