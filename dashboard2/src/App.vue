<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useStore } from 'vuex'
import ScrollToTop from '@core/components/ScrollToTop.vue'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { hexToRgb } from '@layouts/utils'

const { theme } = useThemeConfig()

theme.value = 'light'

const { syncInitialLoaderTheme, syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme, isAppRtl, handleSkinChanges } = useThemeConfig()

const { global } = useTheme()

const store = useStore()
const snackbar = computed(() => store.state.snackbarStore)

store.dispatch('initStore/fetchInitData')

watch(() => snackbar.value.isVisible, snackbar => {
  if (snackbar.isVisible === false)
    store.dispatch('snackbarStore/hideSnackbar', {})
}, { deep: true })

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
handleSkinChanges()

const closeSnackbar = () => {

}

const isLoading = computed(() => store.state.loadingStore.isLoading)
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
  <VSnackbar
    v-model="snackbar.isVisible"
    location="top right"
    :color="snackbar.type"
    @v-model:update="closeSnackbar"
  >
    {{ snackbar.message }}
  </VSnackbar>
  <VOverlay
    :model-value="isLoading"
    class="align-center justify-center"
  >
    <VProgressCircular
      color="primary"
      indeterminate
      size="64"
    />
  </VOverlay>
</template>
