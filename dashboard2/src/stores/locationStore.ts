import axios from '@axios'

// src/store/locationStore.js
export default ({
  state: {
    countries: [],
    cities: [],
    districts: [],
    neighbourhoods: [],
  },

  mutations: {
    SET_COUNTRIES(state, countries) {
      state.countries = countries
    },
    SET_CITIES(state, cities) {
      state.cities = cities
    },
    SET_DISTRICTS(state, districts) {
      state.districts = districts
    },
    SET_NEIGHBOURHOODS(state, neighbourhoods) {
      state.neighbourhoods = neighbourhoods
    },
  },

  actions: {
    async fetchCountries({ commit }) {
      try {
        const response = await axios.get('/location/country')

        commit('SET_COUNTRIES', response.data.result.set)
      }
      catch (error) {
        console.error('Error fetching countries:', error)
      }
    },

    async fetchCities({ commit }, countryId) {
      try {
        const response = await axios.get(`/location/city/${countryId}`)

        commit('SET_CITIES', response.data.result.set)
      }
      catch (error) {
        console.error('Error fetching cities:', error)
      }
    },

    async fetchDistricts({ commit }, cityId) {
      try {
        const response = await axios.get(`/location/district/${cityId}`)

        commit('SET_DISTRICTS', response.data.result.set)
      }
      catch (error) {
        console.error('Error fetching districts:', error)
      }
    },

    async fetchNeighbourhoods({ commit }, districtId) {
      try {
        const response = await axios.get(`/location/neighbourhood/${districtId}`)

        commit('SET_NEIGHBOURHOODS', response.data.result.set)
      }
      catch (error) {
        console.error('Error fetching neighbourhoods:', error)
      }
    },
  },

  getters: {
    getItemByCountryId: state => name => {
      return state.countries.find(item => item.name == name).id
    },
    getItemByCityId: state => name => {
      return state.cities.find(item => item.name == name).id
    },
    getItemByDisId: state => name => {
      return state.district.find(item => item.name == name).id
    },
    getItemByNeiId: state => name => {
      return state.neighbourhood.find(item => item.name == name).id
    },
  },
})
