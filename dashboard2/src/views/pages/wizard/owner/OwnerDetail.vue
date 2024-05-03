<script setup lang="ts">
import type { OwnerDetails } from './types'
import { emailValidator, requiredValidator } from '@validators'

const props = defineProps<{
  formData: OwnerDetails
}>()

const emit = defineEmits<{
  (e: 'update:formData', value: OwnerDetails): void
}>()

const formData = ref<OwnerDetails>(props.formData)

watch(formData, () => {
  emit('update:formData', formData.value)
})
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      sm="4"
    >
      <!-- 👉 First Name -->
      <AppTextField
        v-model="formData.idendityNumber"
        label="Tc Kimlik Numarası"
        placeholder="TC Kimlik Numarası"
      />
    </VCol>
    <VCol
      cols="12"
      sm="4"
    >
      <!-- 👉 First Name -->
      <AppTextField
        v-model="formData.firstName"
        label="İsim"
        placeholder="Ahmet"
        :rules="[requiredValidator]"
      />
    </VCol>
    <VCol
      cols="12"
      sm="4"
    >
      <!-- 👉 First Name -->
      <AppTextField
        v-model="formData.lastName"
        label="Soyisim"
        placeholder="Özçelik"
        :rules="[requiredValidator]"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <!-- 👉 First Name -->
      <AppTextField
        v-model="formData.email"
        label="Email"
        placeholder="info@karadeniztatili.net"
        :rules="[requiredValidator, emailValidator]"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <!-- 👉 First Name -->
      <AppTextField
        v-model="formData.phone"
        label="Telefon"
        placeholder="0505505555"
        :rules="[requiredValidator]"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <!-- 👉 First Name -->
      <AppTextField
        v-model="formData.emailTwo"
        label="Email 2"
        placeholder="info@karadeniztatili.net"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <!-- 👉 First Name -->
      <AppTextField
        v-model="formData.phoneTwo"
        label="Telefon 2"
        placeholder="0505505555"
      />
    </VCol>
  </VRow>
</template>
