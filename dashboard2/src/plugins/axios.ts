import axios from 'axios'
import router from '@/router'
import { store } from '@/stores'

console.log(import.meta.env)

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
  baseURL: import.meta.env.VITE_APP_URL,
})

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(config => {
  store.dispatch('loadingStore/showLoading') // or equivalent Vuex action

  // Retrieve token from localStorage
  const token = localStorage.getItem('accessToken')

  // If token is found
  if (token) {
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {}

    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
    config.headers.Authorization = token ? `Bearer ${token}` : ''
  }

  // Return modified config
  return config
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(response => {
  store.dispatch('loadingStore/hideLoading') // or equivalent Vuex action
  if (response.data.code === '200.0404')
    store.dispatch('snackbarStore/showSnackbar', { message: response.data.message, type: 'error' }) // or equivalent Vuex action

  return response
}, error => {
  store.dispatch('loadingStore/hideLoading') // or equivalent Vuex action

  // Handle error
  if (error.response && error.response.status === 401) {
    store.dispatch('snackbarStore/showSnackbar', { message: error.response.data.message, type: 'error' }) // or equivalent Vuex action

    // ℹ️ Logout user and redirect to login page
    // Remove "userData" from localStorage
    localStorage.removeItem('userData')

    // Remove "accessToken" from localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userAbilities')

    // If 401 response returned from api
    router.push('/login')
  }
  else {
    return Promise.reject(error)
  }
})

export default axiosIns
