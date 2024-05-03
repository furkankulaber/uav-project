// src/store/contractStore.js
import axios from '@axios'

export default {
  namespaced: true, // Namespacing the module
  state: {
    items: [],
    totalItems: 0,
    contractData: null,
    contractDetail: null,
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items
    },
    SET_TOTAL_ITEMS(state, totalItems) {
      state.totalItems = totalItems
    },
    SET_CONTRACT(state, contract) {
      state.contract = contract
    },
    SET_CONTRACT_DETAIL(state, contractDetail) {
      state.contractDetail = contractDetail
    },
  },
  actions: {
    async fetchData({ commit, dispatch }, options) {
      dispatch('loadingStore/showLoading', null, { root: true }) // Dispatch the loading action
      try {
        const response = await axios.get('/contract', { params: options })

        commit('SET_ITEMS', response.data.result.set)
        commit('SET_TOTAL_ITEMS', response.data.result.pagination.totalItems)
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
      }
      catch (error) {
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
        dispatch('snackbarStore/showSnackbar', { message: error.response.data.message, type: 'error' }) // or equivalent Vuex action
        console.error('Error fetching contracts:', error)
      }
    },
    async fetchContractDetail({ commit, dispatch }, contractId) {
      dispatch('loadingStore/showLoading', null, { root: true }) // Dispatch the loading action
      try {
        const response = await axios.get(`/contract/${contractId}`)

        commit('SET_CONTRACT_DETAIL', response.data.result.set)
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
      }
      catch (error) {
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
        dispatch('snackbarStore/showSnackbar', { message: error.response.data.message, type: 'error' }) // or equivalent Vuex action
        console.error('Error fetching contract detail:', error)
      }
    },
    async searchContract({ commit, dispatch }, options) {
      dispatch('loadingStore/showLoading', null, { root: true }) // Dispatch the loading action
      try {
        const response = await axios.get('/contract/search', { params: options })

        commit('SET_ITEMS', response.data.result.set)
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
      }
      catch (error) {
        console.log(error)
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
        dispatch('snackbarStore/showSnackbar', { message: error.response.data.message, type: 'error' }) // or equivalent Vuex action
        console.error('Error searching contracts:', error)
      }
    },
    createContract({ commit, dispatch }, contractData) {
      dispatch('loadingStore/showLoading', null, { root: true }) // Dispatch the loading action

      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        axios.post('/contract/create', contractData)
          .then(response => {
            commit('SET_CONTRACT', response.data)
            dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
            resolve(response)
          })
          .catch(error => {
            dispatch('snackbarStore/showSnackbar', { message: error.response.data.message, type: 'error' }) // or equivalent Vuex action
            dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
            reject(error)
          })
      })
    },
    updateContract({ commit, dispatch }, contractData) {
      dispatch('loadingStore/showLoading', null, { root: true }) // Dispatch the loading action

      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        axios.put(`/contract/${contractData.id}`, contractData)
          .then(response => {
            commit('SET_CONTRACT', response.data)
            dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
            resolve(response)
          })
          .catch(error => {
            dispatch('snackbarStore/showSnackbar', { message: error.response.data.message, type: 'error' }) // or equivalent Vuex action
            dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
            reject(error)
          })
      })
    },
  },
}
