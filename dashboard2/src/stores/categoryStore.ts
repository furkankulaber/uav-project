// eslint-disable-next-line valid-appcardcode-code-prop
import axios from '@axios'

// src/store/categoryStore.js
export default ({
  state: {
    categories: [],
  },

  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
  },

  actions: {
    async fetchCategories({commit}) {
      try {
        const response = await axios.get('/category/')

        commit('SET_CATEGORIES', response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
  },

  getters: {
    getItemByCategoryId: state => name => {
      return state.categories.find(item => item.name == name).id
    },
  },
})
