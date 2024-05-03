// src/store/initStore.js
import axios from '@axios'

export default {
  namespaced: true, // Namespacing the module
  state: {
    definition: [],
  },
  mutations: {
    SET_DEFINITION(state, definition) {
      state.definition = definition
    },
  },
  actions: {
    async fetchInitData({ commit }, options) {
      try {
        const response = await axios.get('/init', { params: options })

        commit('SET_DEFINITION', response.data.result.set.definition)
      }
      catch (error) {
        console.error('Error fetching listings:', error)
      }
    },
  },
}
