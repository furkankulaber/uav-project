<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import logo from '/src/assets/images/logo.png'

import { store } from '@/stores'

import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const userStore = computed(() => store.state.userStore.user)
const loading = computed(() => store.state.loadingStore.isLoading)
const snackbar = computed(() => store.state.snackbarStore)

const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const isPasswordVisible = ref(false)

const refVForm = ref<VForm>()
const email = ref('customer')
const password = ref('testpass')
const rememberMe = ref(false)

const login = () => {
  store.dispatch('userStore/login', { username: email.value, password: password.value })
}

const onSubmit = () => {
  refVForm.value?.validate()
    .then(({ valid: isValid }) => {
      if (isValid)
        login()
    })
}
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper bg-surface"
  >
    <VSnackbar
      v-model="snackbar.isVisible"
      location="top right"
      :color="snackbar.type"
    >
      {{ snackbar.message }}
    </VSnackbar>


    <VCol
      cols="12"
      lg="12"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="mb-6"
          />

          <h5 class="text-h5 mb-1">
            <span class="text-capitalize"> {{ themeConfig.app.title }} </span>! 👋🏻
          </h5>

          <p class="mb-0">
            Lütfen giriş yapınız
          </p>
        </VCardText>

        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  label="Email"
                  type="text"
                  autofocus
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  label="Parola"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                  <VCheckbox
                    v-model="rememberMe"
                    label="Beni Hatırla"
                  />
                  <a
                    class="text-primary ms-2 mb-1"
                    href="#"
                  >
                    Parolamı unuttum?
                  </a>
                </div>

                <div>
                  Yetkili kullanıcı için: admin <br>
                  Müşteri kullanıcı için: customer
                </div>
                <VBtn
                  v-if="!loading.isLoading"
                  block
                  type="submit"
                  :disabled="loading.isLoading"
                >
                  Giriş yap
                </VBtn>

                <VProgressLinear
                  v-if="loading.isLoading"
                  indeterminate
                  class="mb-0"
                />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
