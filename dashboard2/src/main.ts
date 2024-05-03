/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import { store } from '@/stores'
import '@core/scss/template/index.scss'
import * as GmapVue from '@gmap-vue/v3'
import '@styles/styles.scss'
import 'sweetalert2/dist/sweetalert2.min.css'
import { createApp } from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

loadFonts()

// Create vue app
const app = createApp(App)

// Use plugins
app.use(VueSweetalert2)
app.use(vuetify)
app.use(store)
app.use(router)
app.use(layoutsPlugin)

app.use(GmapVue.GmapVuePlugin, {
  load: {
    // [REQUIRED] This is the unique required value by Google Maps API
    key: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    v: '3.54',

    // [OPTIONAL] This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
    libraries: 'places',

    // This option was added on v3.0.0 but will be removed in the next major release.
    // If you already have an script tag that loads Google Maps API and you want to use it set you callback
    // here and our callback `GoogleMapsCallback` will execute your custom callback at the end; it must attached
    // to the `window` object, is the only requirement.
    customCallback: 'MyCustomCallback',
  },

  // [OPTIONAL] If you intend to programmatically custom event listener code
  // (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  // instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  // you might need to turn this on.
  autoBindAllEvents: false,

  // [OPTIONAL] If you want to manually install components, e.g.
  // import {GmapMarker} from 'gmap-vue/src/components/marker'
  // Vue.component('GmapMarker', GmapMarker)
  // then set installComponents to 'false'.
  // If you want to automatically install all the components this property must be set to 'true':
  installComponents: true,

  // Load the Google Maps API dynamically, if you set this to `true` the plugin doesn't load the Google Maps API
  dynamicLoad: false,
})

window.Swal = app.config.globalProperties.$swal

// Mount vue app
app.mount('#app')
