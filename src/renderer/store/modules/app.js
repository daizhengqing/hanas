const state = {
  title: ''
}

const mutations = {
  setTitle (state, val) {
    state.title = val
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
