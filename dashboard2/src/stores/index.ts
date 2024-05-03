// src/store/index.js
import { createStore } from 'vuex'

import contractStore from './contractStore'
import initStore from './initStore'
import droneStore from './droneStore'
import loadingStore from './loadingStore'
import snackbarStore from './snackbarStore'
import userStore from './userStore'
import categoryStore from './categoryStore'
import brandStore from './brandStore'
import bookingStore from './bookingStore'

export const store = createStore({

  modules: {
    loadingStore,
    droneStore,
    snackbarStore,
    userStore,
    initStore,
    contractStore,
    categoryStore,
    brandStore,
    bookingStore
  },
})
