const state = {
  loading: false
}

const mutations = {
  setLoading (state, val) {
    state.loading = val
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
