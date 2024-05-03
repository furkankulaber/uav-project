// src/store/calendarStore.js
import axios from '@axios'

export default {
  namespaced: true, // Namespacing the module
  state: {
    events: [],
    availableCalendars: [
      {
        color: 'error',
        label: 'Personal',
      },
      {
        color: 'primary',
        label: 'Business',
      },
      {
        color: 'warning',
        label: 'Family',
      },
      {
        color: 'success',
        label: 'Holiday',
      },
      {
        color: 'info',
        label: 'ETC',
      },
    ],
    selectedCalendars: ['Personal', 'Business', 'Family', 'Holiday', 'ETC'],
    dateFilter: {
      startDate: null,
      endDate: null,
    },
  },
  getters: {
    checkAll: state => {
      return state.selectedCalendars.length === state.availableCalendars.length
    },
  },
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    UPDATE_EVENT(state, updatedEvent) {
      const index = state.events.findIndex(event => event.id === updatedEvent.id)
      if (index !== -1)
        Vue.set(state.events, index, updatedEvent)
    },
    REMOVE_EVENT(state, eventId) {
      const index = state.events.findIndex(event => event.id === eventId)
      if (index !== -1)
        state.events.splice(index, 1)
    },
    SET_SELECTED_CALENDARS(state, payload) {
      state.selectedCalendars = payload
    },
    SET_DATE_FILTER(state, payload) {
      state.dateFilter = payload
    },
  },
  actions: {
    fetchEvents({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`/listing/${payload.id}/calendar`, {
          params: { calendars: state.selectedCalendars.join(','), ...state.dateFilter },
        }).then(response => {
          commit('SET_EVENTS', response.data.result.set)
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    async addEvent({ commit }, event) {
      const response = await axios.post('/apps/calendar/events', { event })

      commit('ADD_EVENT', response.data)
    },
    async updateEvent({ commit }, event) {
      const response = await axios.post(`/apps/calendar/events/${event.id}`, { event })

      commit('UPDATE_EVENT', response.data)
    },
    async removeEvent({ commit }, eventId) {
      await axios.delete(`/apps/calendar/events/${eventId}`)
      commit('REMOVE_EVENT', eventId)
    },
    toggleSelectAll({ commit, state }) {
      if (state.selectedCalendars.length !== state.availableCalendars.length)
        commit('SET_SELECTED_CALENDARS', state.availableCalendars.map(i => i.label))

      else
        commit('SET_SELECTED_CALENDARS', [])
    },
    setDateFilter({ commit }, payload) {
      commit('SET_DATE_FILTER', payload)
    },
  },
}
