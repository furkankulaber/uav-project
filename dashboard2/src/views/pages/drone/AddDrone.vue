<script setup lang="ts">
import {computed, ref} from 'vue'
import {useStore} from 'vuex'

const store = useStore()

const showModal = ref(false)
const formData = ref({
  category: '',
  brand: '',
  model: '',
  price: null,
  currency: '',
  weight: null,
  status: '',
})


const categories = computed(() => store.state.categoryStore.categories)
const brands = computed(() => store.state.brandStore.brands)

store.dispatch('fetchCategories')
store.dispatch('fetchBrands')

const statusChoices = [
  {value: 'Available', text: 'Available'},
  {value: 'Unavailable', text: 'Unavailable'},
  {value: 'Under Maintenance', text: 'Under Maintenance'},
]

const addDrone = () => {
  console.log(formData.value)
  store.dispatch('droneStore/createDrone', formData.value)
  closeModal()
}

const closeModal = () => {
  showModal.value = false
}
</script>

<template>
  <VDialog v-model="showModal" max-width="600">
    <template v-slot:activator="{ on }">
      <VBtn color="primary" @click="showModal = true">Yeni Drone Ekle</VBtn>
    </template>
    <VCard>
      <VCardTitle>Yeni Drone Ekle</VCardTitle>
      <VCardText>
        <VForm>
          <VRow>
            <VCol cols="12" sm="6">
              <AppAutocomplete v-model="formData.category" label="Category" :items="categories" item-title="name"
                               return-object/>
            </VCol>
            <VCol cols="12" sm="6">
              <AppAutocomplete v-model="formData.brand" label="Brand" :items="brands" item-title="name" return-object/>
            </VCol>
            <VCol cols="12" sm="6">
              <AppTextField v-model="formData.model" label="Model"/>
            </VCol>
            <VCol cols="12" sm="6">
              <AppTextField v-model="formData.price" label="Price" type="number"/>
            </VCol>
            <VCol cols="12" sm="6">
              <AppTextField v-model="formData.currency" label="Currency"/>
            </VCol>
            <VCol cols="12" sm="6">
              <AppTextField v-model="formData.weight" label="Weight" type="number"/>
            </VCol>
            <VCol cols="12" sm="6">
              <AppSelect v-model="formData.status" :items="statusChoices" label="Status" item-title="text"/>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" offset="8" align-self="end">
              <VBtn color="primary" @click="addDrone">Ekle</VBtn>
              <VBtn color="error" @click="closeModal">İptal</VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
</style>
