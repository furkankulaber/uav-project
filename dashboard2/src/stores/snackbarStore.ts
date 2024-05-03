// src/store/snackbarStore
export default {
  namespaced: true, // This ensures that all actions, mutations, and getters inside this module are namespaced.
  state: {
    isVisible: false,
    message: '',
    type: 'error',
  },
  mutations: {
    SHOW_SNACKBAR(state, payload) {
      state.isVisible = true
      state.message = payload.message
      state.type = payload.type
    },
    HIDE_SNACKBAR(state) {
      state.isVisible = false
      state.message = ''
      state.type = ''
    },
  },
  actions: {
    showSnackbar({ commit }, { message, type }) {
      commit('SHOW_SNACKBAR', { message, type })
    },
    hideSnackbar({ commit }) {
      commit('HIDE_SNACKBAR')
    },
  },
}
