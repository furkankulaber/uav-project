// src/store/userStore.js
import router from '@/router'
import axios from '@axios'

export default {
  namespaced: true,
  state: {
    user: null,
    items: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_ITEMS(state, items) {
      state.items = items
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user)
    },
    login({ dispatch }, userCredentials) {
      return axios.post('/token/', userCredentials)
        .then(response => {
          if (response) {
            localStorage.setItem('accessToken', response.data.access)
            dispatch('userData')
          }
        })
    },
    userData({ commit }) {
      return axios.get('/user-info/')
        .then(response => {
          localStorage.setItem('userData', JSON.stringify(response.data))
          commit('SET_USER', response.data)
          router.push('/')
        })
    },
    async fetchUser({ commit, dispatch }, options) {
      dispatch('loadingStore/showLoading', null, { root: true }) // Dispatch the loading action
      try {
        const response = await axios.get('/user/list', { params: options })

        commit('SET_ITEMS', response.data.result.set)
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
      }
      catch (error) {
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
        dispatch('snackbarStore/showSnackbar', { message: error.response.detail, type: 'error' }) // or equivalent Vuex action
        console.error('Error fetching owners:', error)
      }
    },
    async searchUser({ commit, dispatch }, options) {
      dispatch('loadingStore/showLoading', null, { root: true }) // Dispatch the loading action
      try {
        const response = await axios.get('/user/search', { params: options })

        commit('SET_ITEMS', response.data.result.set)
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
      }
      catch (error) {
        console.log(error)
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
        dispatch('snackbarStore/showSnackbar', { message: error.response.data.message, type: 'error' }) // or equivalent Vuex action
        console.error('Error searching owners:', error)
      }
    },
  },
}
