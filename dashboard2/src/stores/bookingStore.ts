// src/store/bookingStore.js
import axios from '@axios'

export default {
  namespaced: true, // Namespacing the module
  state: {
    items: [],
    totalItems: 0,
    booking: null,
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items
    },
    SET_TOTAL_ITEMS(state, totalItems) {
      state.totalItems = totalItems
    },
    SET_BOOKING(state, booking) {
      state.booking = booking
    },
    DELETE_BOOKING(state, id) {
      state.items = state.items.filter(booking => booking.id !== id)
      state.totalItems -= 1
    }
  },
  actions: {
    async fetchData({commit}, options) {
      try {
        const ordering = options.sortBy && options.sortBy[0] ? `${options.sortBy[0].key}` : ''; // sorting key
        const order = options.sortBy && options.sortBy[0] ? (options.sortBy[0].order === 'desc' ? '-' : '') : ''; // sorting order

        options.ordering = `${order}${ordering}`;
        options.pageSize = options.itemsPerPage;
        const response = await axios.get('/bookings/', {params: options})

        commit('SET_ITEMS', response.data.results)
        commit('SET_TOTAL_ITEMS', response.data.count)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    },
    fetchBooking({commit}, id) {
      return new Promise((resolve, reject) => {
          axios.get(`/bookings/${id}/`).then(response => {
            commit('SET_BOOKING', response.data.result.set)
            resolve(response)
          }).catch(error => {
            console.log(error)
            reject(error)
          })
        },
      )
    },
    bookingDetails({commit}, id) {
      return new Promise((resolve, reject) => {
          axios.get(`/bookings/${id}/`).then(response => {
            commit('SET_BOOKING', response.data)
            resolve(response)
          }).catch(error => {
            console.log(error)
            reject(error)
          })
        },
      )
    },
    updateBooking({commit, dispatch}, object) {
      dispatch('loadingStore/showLoading', null, {root: true}) // Dispatch the loading action

      return new Promise((resolve, reject) => {
          axios.put(`/bookings/${object.id}/`, object).then(response => {
            commit('SET_BOOKING', response.data)
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
    createBooking({commit, dispatch}, object) {
      dispatch('loadingStore/showLoading', null, {root: true}) // Dispatch the loading action

      return new Promise((resolve, reject) => {
          axios.post(`/bookings/`, object).then(response => {
            commit('SET_BOOKING', response.data)
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
    async deleteBooking({dispatch}, id) {
      dispatch('loadingStore/showLoading', null, {root: true})

      try {
        await axios.delete(`/bookings/${id}/`)
        dispatch('snackbarStore/showSnackbar', {message: 'Silme işlemi başarılı', type: 'success'}, {root: true})
      } catch (error) {
        console.error('Error deleting booking:', error)
        dispatch('snackbarStore/showSnackbar', {message: 'Silme işlemi başarısız', type: 'error'}, {root: true})
      } finally {
        dispatch('loadingStore/hideLoading', null, {root: true})
      }
    },
  },
}
