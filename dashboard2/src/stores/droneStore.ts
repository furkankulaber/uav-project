// src/store/droneStore.js
import axios from '@axios'

export default {
  namespaced: true, // Namespacing the module
  state: {
    items: [],
    totalItems: 0,
    drone: null,
    availableItems: [],
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items
    },
    SET_TOTAL_ITEMS(state, totalItems) {
      state.totalItems = totalItems
    },
    SET_DRONE(state, drone) {
      state.drone = drone
    },
    DELETE_DRONE(state, id) {
      state.items = state.items.filter(drone => drone.id !== id)
      state.totalItems -= 1
    },
    SET_AVAILABLE_ITEMS(state, items) {
      state.availableItems = items
    },
  },
  actions: {
    async fetchData({commit}, options) {
      try {
        const ordering = options.sortBy && options.sortBy[0] ? `${options.sortBy[0].key}` : ''; // sorting key
        const order = options.sortBy && options.sortBy[0] ? (options.sortBy[0].order === 'desc' ? '-' : '') : ''; // sorting order

        options.ordering = `${order}${ordering}`;
        options.pageSize = options.itemsPerPage;
        const response = await axios.get('/drones/', {params: options})

        commit('SET_ITEMS', response.data.results)
        commit('SET_TOTAL_ITEMS', response.data.count)
      } catch (error) {
        console.error('Error fetching drones:', error)
      }
    },
    fetchDrone({commit}, id) {
      return new Promise((resolve, reject) => {
          axios.get(`/drones/${id}/`).then(response => {
            commit('SET_DRONE', response.data.result.set)
            resolve(response)
          }).catch(error => {
            console.log(error)
            reject(error)
          })
        },
      )
    },
    droneDetails({commit}, id) {
      return new Promise((resolve, reject) => {
          axios.get(`/drones/${id}/`).then(response => {
            commit('SET_DRONE', response.data)
            resolve(response)
          }).catch(error => {
            console.log(error)
            reject(error)
          })
        },
      )
    },
    updateDrone({commit, dispatch}, object) {
      dispatch('loadingStore/showLoading', null, {root: true}) // Dispatch the loading action

      return new Promise((resolve, reject) => {
          axios.put(`/drones/${object.id}/`, object.drone).then(response => {
            commit('SET_DRONE', response.data)
            dispatch('snackbarStore/showSnackbar', {message: 'İşlem başarılı', type: 'success'}, {root: true}) // or equivalent Vuex action
            dispatch('loadingStore/hideLoading', null, {root: true}) // Dispatch the loading action
            resolve(response)
          }).catch(error => {
            console.log(error)
            dispatch('snackbarStore/showSnackbar', {message: error.detail, type: 'error'}, {root: true}) // or equivalent Vuex action
            dispatch('loadingStore/hideLoading', null, {root: true}) // Dispatch the loading action
            reject(error)
          })
        },
      )
    },
    createDrone({commit, dispatch}, object) {
      dispatch('loadingStore/showLoading', null, {root: true}) // Dispatch the loading action

      return new Promise((resolve, reject) => {
          axios.post(`/drones/`, object).then(response => {
            commit('SET_DRONE', response.data)
            dispatch('snackbarStore/showSnackbar', {message: 'İşlem başarılı', type: 'success'}, {root: true}) // or equivalent Vuex action
            dispatch('loadingStore/hideLoading', null, {root: true}) // Dispatch the loading action
            resolve(response)
          }).catch(error => {
            console.log(error)
            dispatch('snackbarStore/showSnackbar', {message: error.detail, type: 'error'}, {root: true}) // or equivalent Vuex action
            dispatch('loadingStore/hideLoading', null, {root: true}) // Dispatch the loading action
            reject(error)
          })
        },
      )
    },
    async deleteDrone({dispatch}, id) {
      dispatch('loadingStore/showLoading', null, {root: true})

      try {
        await axios.delete(`/drones/${id}/`)
        dispatch('snackbarStore/showSnackbar', {message: 'Silme işlemi başarılı', type: 'success'}, {root: true})
      } catch (error) {
        console.error('Error deleting drone:', error)
        dispatch('snackbarStore/showSnackbar', {message: 'Silme işlemi başarısız', type: 'error'}, {root: true})
      } finally {
        dispatch('loadingStore/hideLoading', null, {root: true})
      }
    },
    async fetchAvailableDrones({commit}, object) {
      console.log(object)
      return new Promise((resolve, reject) => {
        axios.get('/drones/available_drones/', {
          params: {
            start_date: object.start_date,
            end_date: object.end_date,
          },
        })
        .then(response => {
          commit('SET_AVAILABLE_ITEMS', response.data)
          resolve(response)
        })
        .catch(error => {
          console.error('Error fetching available drones:', error)
          reject(error)
        })
      })
    },
  },
}
