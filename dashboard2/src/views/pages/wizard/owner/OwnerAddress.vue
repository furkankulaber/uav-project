<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import type { OwnerAddress } from './types'

const props = defineProps<{
  formData: OwnerAddress
}>()

const emit = defineEmits<{
  (e: 'update:formData', value: OwnerAddress): void
}>()

const formData = ref<OwnerAddress>(props.formData)

const location = ref({
  country: '',
  city: '',
  district: '',
  neighbourhood: '',
})

watch(formData, () => {
  emit('update:formData', formData.value)
})

const store = useStore()

store.dispatch('fetchCountries')

// Using computed properties to get reactive values
const countries = computed(() => store.state.locationStore.countries)
const cities = computed(() => store.state.locationStore.cities)
const district = computed(() => store.state.locationStore.districts)
const neighbourhood = computed(() => store.state.locationStore.neighbourhoods)

watch(() => countries, countries => {
  formData.value.country = countries.value[0]
},
{ deep: true })

watch(() => cities, cities => {
  formData.value.city = cities.value[52]
},
{ deep: true })
watch(() => district, district => {
  formData.value.district = district.value[0]
},
{ deep: true })
watch(() => neighbourhood, neighbourhood => {
  formData.value.neighbourhood = neighbourhood.value[0]
},
{ deep: true })

// Watch for changes to the country and update the city dropdown.
watch(() => formData.value.country, newCountry => {
  store.dispatch('fetchCities', newCountry.id)
  formData.value.country = newCountry
},
{ deep: true })

// Similarly, watch for changes to the city and update the district dropdown.
watch(() => formData.value.city, newCity => {
  if (newCity) {
    store.dispatch('fetchDistricts', newCity.id)
    formData.value.city = newCity
  }
},
{ deep: true })

watch(() => formData.value.district, newDisctrict => {
  if (newDisctrict) {
    store.dispatch('fetchNeighbourhoods', newDisctrict.id)
    formData.value.district = newDisctrict
  }
},
{ deep: true })

watch(() => formData.value.neighbourhood, newDisctrict => {
  formData.value.neighbourhood = newDisctrict
},
{ deep: true })
</script>

<template>
  <VForm>
    <VRow>
      <VCol
        cols="12"
        sm="12"
      >
        <!-- 👉 Landmark -->
        <AppTextarea
          v-model="formData.address"
          label="Adres"
          placeholder="Ardeşen, Deniz Mahallesi"
        />
      </VCol>
      <VCol
        cols="12"
        sm="3"
      >
        <!-- 👉 Landmark -->
        <AppSelect
          v-model="formData.country"
          label="Ülke"
          :items="countries"
          item-title="name"
          return-object
        />
      </VCol>

      <VCol
        cols="12"
        sm="3"
      >
        <!-- 👉 Landmark -->
        <AppAutocomplete
          v-model="formData.city"
          label="İl"
          :items="cities"
          item-title="name"
          return-object
        />
      </VCol>

      <VCol
        cols="12"
        sm="3"
      >
        <!-- 👉 Landmark -->
        <AppAutocomplete
          v-model="formData.district"
          label="İlçe"
          item-title="name"
          :items="district"
          return-object
        />
      </VCol>

      <VCol
        cols="12"
        sm="3"
      >
        <!-- 👉 Landmark -->
        <AppAutocomplete
          v-model="formData.neighbourhood"
          label="Mahalle"
          item-title="name"
          :items="neighbourhood"
          return-object
        />
      </VCol>

      <VCol
        cols="12"
        sm="4"
      >
        <!-- 👉 Landmark -->
        <AppTextField
          v-model="formData.companyName"
          label="Şirket Adı (Varsa)"
        />
      </VCol>

      <VCol
        cols="12"
        sm="4"
      >
        <!-- 👉 Landmark -->
        <AppTextField
          v-model="formData.taxAdministration"
          label="Vergi Dairesi (Varsa)"
        />
      </VCol>

      <VCol
        cols="12"
        sm="4"
      >
        <!-- 👉 Landmark -->
        <AppTextField
          v-model="formData.taxNumber"
          label="Vergi Numarası (Varsa)"
        />
      </VCol>

      <VCol
        cols="12"
        sm="12"
      >
        <!-- 👉 Landmark -->
        <AppAutocomplete
          v-model="formData.status"
          label="Durum"
          item-title="name"
          item-value="value"
          :items="[
            { name: 'Aktif', value: true },
            { name: 'Pasif', value: false },
          ]"
        />
      </VCol>
    </VRow>
  </VForm>
</template>
