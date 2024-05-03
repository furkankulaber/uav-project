// eslint-disable-next-line valid-appcardcode-code-prop
import axios from '@axios'

// src/store/brandStore.js
export default ({
  state: {
    brands: [],
  },

  mutations: {
    SET_BRANDS(state, brands) {
      state.brands = brands
    },
  },

  actions: {
    async fetchBrands({ commit }) {
      try {
        const response = await axios.get('/brands/')

        commit('SET_BRANDS', response.data)
      }
      catch (error) {
        console.error('Error fetching brands:', error)
      }
    },
  },

  getters: {
    getItemByBrandsId: state => name => {
      return state.brands.find(item => item.name == name).id
    },
  },
})
