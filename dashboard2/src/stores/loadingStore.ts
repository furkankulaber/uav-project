// src/store/loadingStore.js
export default {
  namespaced: true, // This ensures that all actions, mutations, and getters inside this module are namespaced.
  state: {
    isLoading: false,
  },
  mutations: {
    SHOW_LOADING(state) {
      state.isLoading = true
    },
    HIDE_LOADING(state) {
      state.isLoading = false
    },
  },
  actions: {
    showLoading({ commit }) {
      commit('SHOW_LOADING')
    },
    hideLoading({ commit }) {
      commit('HIDE_LOADING')
    },
  },
}
