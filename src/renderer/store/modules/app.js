const state = {
  loading: false,
  current: {},
  reading: false
}

const mutations = {
  setLoadingState (state, val) {
    state.loading = val
  },

  setCurrentReading (state, val) {
    state.current = val
  },

  setReadingState (state, val) {
    state.reading = val
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
