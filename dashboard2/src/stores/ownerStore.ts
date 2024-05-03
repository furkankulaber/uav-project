// src/store/ownerStore.js
import axios from '@axios'

export default {
  namespaced: true, // Namespacing the module
  state: {
    items: [],
    totalItems: 0,
    ownerData: null,
    ownerDetail: null,
    bankOwner: null,
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items
    },
    SET_TOTAL_ITEMS(state, totalItems) {
      state.totalItems = totalItems
    },
    SET_OWNER(state, owner) {
      state.owner = owner
    },
    SET_OWNER_DETAIL(state, ownerDetail) {
      state.ownerDetail = ownerDetail<Owner>
    },
    SET_BANK_OWNER(state, bankOwner) {
      state.bankOwner = bankOwner
    },
    ADD_OWNER_BANK_ACCOUNT(state, bankAccount) {
      state.ownerDetail.bankAccounts.push(bankAccount)
    },
    ADD_OWNER_USER_ACCOUNT(state, userAccount) {
      state.ownerDetail.user.push(userAccount)
    },
    UPDATE_OWNER_BANK_ACCOUNT(state, bankAccount) {
      const index = state.ownerDetail.bankAccounts.findIndex((item: any) => item.id === bankAccount.id)

      state.ownerDetail.bankAccounts[index] = bankAccount
    },
  },
  actions: {
    async fetchData({ commit, dispatch }, options) {
      dispatch('loadingStore/showLoading', null, { root: true }) // Dispatch the loading action
      try {
        const response = await axios.get('/owner', { params: options })

        commit('SET_ITEMS', response.data.result.set)
        commit('SET_TOTAL_ITEMS', response.data.result.pagination.totalItems)
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
      }
      catch (error) {
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
        dispatch('snackbarStore/showSnackbar', { message: error.response.data.message, type: 'error' }) // or equivalent Vuex action
        console.error('Error fetching owners:', error)
      }
    },
    async fetchOwnerDetail({ commit, dispatch }, ownerId) {
      dispatch('loadingStore/showLoading', null, { root: true }) // Dispatch the loading action
      try {
        const response = await axios.get(`/owner/${ownerId}`)

        commit('SET_OWNER_DETAIL', response.data.result.set)
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
      }
      catch (error) {
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
        dispatch('snackbarStore/showSnackbar', { message: error.response.data.message, type: 'error' }, { root: true }) // or equivalent Vuex action
        console.error('Error fetching owner detail:', error)
      }
    },
    async searchOwner({ commit, dispatch }, options) {
      dispatch('loadingStore/showLoading', null, { root: true }) // Dispatch the loading action
      try {
        const response = await axios.get('/owner/search', { params: options })

        commit('SET_ITEMS', response.data.result.set)
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
      }
      catch (error) {
        console.log(error)
        dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
        dispatch('snackbarStore/showSnackbar', { message: error.response.data.message, type: 'error' }, { root: true }) // or equivalent Vuex action
        console.error('Error searching owners:', error)
      }
    },
    createOwner({ commit, dispatch }, ownerData) {
      dispatch('loadingStore/showLoading', null, { root: true }) // Dispatch the loading action

      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        axios.post('/owner/create', ownerData)
          .then(response => {
            commit('SET_OWNER', response.data.result.set)
            dispatch('snackbarStore/showSnackbar', { message: response.data.message, type: 'success' }, { root: true }) // or equivalent Vuex action
            dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
            resolve(response)
          })
          .catch(error => {
            dispatch('snackbarStore/showSnackbar', { message: error.response.data.message, type: 'error' }, { root: true }) // or equivalent Vuex action
            dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
          })
      }, (error: any) => {
        reject(error)
      })
    },
    createBankOwner({ commit, dispatch }, ownerData) {
      dispatch('loadingStore/showLoading', null, { root: true }) // Dispatch the loading action

      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        axios.post(`/owner/bank-owner/${ownerData.id}`, ownerData.data)
          .then(response => {
            commit('ADD_OWNER_BANK_ACCOUNT', response.data.result.set)
            commit('SET_BANK_OWNER', response.data.result.set)
            dispatch('snackbarStore/showSnackbar', { message: response.data.message, type: 'success' }, { root: true }) // or equivalent Vuex action
            dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
            resolve(response)
          })
          .catch(error => {
            dispatch('snackbarStore/showSnackbar', { message: error.response.data.message, type: 'error' }, { root: true }) // or equivalent Vuex action
            dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
          })
      }, (error: any) => {
        reject(error)
      })
    },
    updateBankOwner({ commit, dispatch }, ownerData) {
      dispatch('loadingStore/showLoading', null, { root: true }) // Dispatch the loading action

      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        axios.post(`/owner/bank-owner/${ownerData.id}`, ownerData.data)
          .then(response => {
            commit('UPDATE_OWNER_BANK_ACCOUNT', response.data.result.set)
            commit('SET_BANK_OWNER', response.data.result.set)
            dispatch('snackbarStore/showSnackbar', { message: response.data.message, type: 'success' }, { root: true }) // or equivalent Vuex action
            dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
            resolve(response)
          })
          .catch(error => {
            dispatch('snackbarStore/showSnackbar', { message: error.response.data.message, type: 'error' }, { root: true }) // or equivalent Vuex action
            dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
          })
      }, (error: any) => {
        reject(error)
      })
    },

    createOwnerUserAccount({ commit, dispatch }, ownerData) {
      dispatch('loadingStore/showLoading', null, { root: true }) // Dispatch the loading action

      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        axios.post(`/owner/user-account/${ownerData.id}`, ownerData.data)
          .then(response => {
            commit('ADD_OWNER_USER_ACCOUNT', response.data.result.set)
            dispatch('snackbarStore/showSnackbar', { message: response.data.message, type: 'success' }, { root: true }) // or equivalent Vuex action
            dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            dispatch('snackbarStore/showSnackbar', { message: error.response.data.message, type: 'error' }, { root: true }) // or equivalent Vuex action
            dispatch('loadingStore/hideLoading', null, { root: true }) // Dispatch the loading action
          })
      }, (error: any) => {
        reject(error)
      })
    },
  },
}
