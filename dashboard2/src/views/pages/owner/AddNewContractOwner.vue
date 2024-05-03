<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components/VForm'
import { regexValidator, requiredValidator } from '@validators'

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void
  (e: 'userData', value): void
}

interface Props {
  isDrawerOpen: boolean
  formData: any
}

const isFormValid = ref(false)
const refForm = ref<VForm>()

const formData = ref({
  accountName: ref(''),
  iban: ref(''),
  routingNumber: ref(''),
  wiseAddress: ref(''),
  accountType: ref('checking'),
  countryType: ref('Turkey'),
  currency: ref('try'),
})

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)

  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('userData', formData.value)

      emit('update:isDrawerOpen', false)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

watch(() => props.formData, () => {
  formData.value = props.formData
})

const handleDrawerModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <AppDrawerHeaderSection
      title="Banka Hesabı Ekle/Düzenle"
      @cancel="closeNavigationDrawer"
    />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- 👉 Full name -->
              <VCol cols="12">
                <AppTextField
                  v-model="formData.accountName"
                  :rules="[requiredValidator]"
                  label="Banka Hesabı"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12">
                <AppTextField
                  v-model="formData.iban"
                  :rules="[requiredValidator, regexValidator(formData.iban, 'TR[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{2})\s?')]"
                  label="IBAN"
                  aria-placeholder="TR00 0000 0000 0000 0000 00"
                />
              </VCol>

              <!-- 👉 Submit and Cancel -->
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
