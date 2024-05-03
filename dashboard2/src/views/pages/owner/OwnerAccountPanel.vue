<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components/VForm'
import { confirmedValidator, emailValidator, requiredValidator } from '@validators'

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

interface Emit {
  (e: 'update:panelIsShow', value: boolean): void
  (e: 'ownerUserData', value): void
}

interface Props {
  panelIsShow: boolean
  formData: any
}

const isFormValid = ref(false)
const refForm = ref<VForm>()

const formData = ref({
  fullname: ref(),
  email: ref(),
  phone: ref(),
  address: ref(),
  password: ref(),
})

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:panelIsShow', false)

  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('ownerUserData', formData)

      emit('update:panelIsShow', false)
    }
  })
}

watch(() => props.formData, () => {
  formData.value = props.formData
  formData.value.password = ''
})

const handleDrawerModelValueUpdate = (val: boolean) => {
  emit('update:panelIsShow', val)
}

const confirmPassword = ref('')
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.panelIsShow"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <AppDrawerHeaderSection
      title="Kullanıcı Hesabı Ekle/Düzenle"
      @cancel="closeNavigationDrawer"
    />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="formData.fullname"
                  :rules="[requiredValidator]"
                  label="İsim Soyisim"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="formData.email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email Adresi"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="formData.phone"
                  label="Telefon"
                />
              </VCol>
              <VCol cols="12">
                <AppTextarea
                  v-model="formData.address"
                  label="Adres"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="formData.password"
                  type="password"
                  label="Parola"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="confirmPassword"
                  type="password"
                  :rules="[confirmedValidator(confirmPassword, formData.password)]"
                  label="Parola Tekrar"
                />
              </VCol>
              <VCol cols="12">
                <AppSelect
                  v-model="formData.isActive"
                  :rules="[requiredValidator]"
                  label="Durum"
                  item-title="text"
                  item-value="value"
                  :items="[
                    { text: 'Aktif', value: true },
                    { text: 'Pasif', value: false },
                  ]"
                />
              </VCol>

              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Kaydet
                </VBtn>
                <VBtn
                  type="reset"
                  variant="tonal"
                  color="secondary"
                  @click="closeNavigationDrawer"
                >
                  İptal
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
