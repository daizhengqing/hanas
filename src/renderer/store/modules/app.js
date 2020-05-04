const state = {
  title: '',
  config: {},
  bookShelf: new Set([])
}

const mutations = {
  setTitle (state, val) {
    state.title = val
  },

  setConfig (state, val) {
    state.config = val
  },

  addToShelf (state, item) {
    state.bookShelf.add(item)
  },

  removeOnShelf (state, item) {
    state.bookShelf.delete(item)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
