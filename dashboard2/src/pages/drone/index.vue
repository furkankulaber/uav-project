<script setup lang="ts">
import {VDataTableServer} from 'vuetify/labs/VDataTable'
import {useStore} from 'vuex'
import AddDrone from "@/views/pages/drone/AddDrone.vue";

const store = useStore()
const search = ref('')

const resolveStatusColor = status => {
  if (status === 'Available')
    return 'success'
  if (status === 'on-hold')
    return 'error'
  if (status === 'Unavailable')
    return 'warning'

  return 'primary'
}

const resolveStatusText = status => {
  if (status === 'Available')
    return 'Aktif'
  if (status === 'oder Maintenance')
    return 'Bakımda'
  if (status === 'Unavailable')
    return 'Pasif'
}

// 👉 methods
const options = ref({
  itemsPerPage: 5,
  headers: [
    {title: '#', key: 'id'},
    {title: 'Category', key: 'category.name', sortable: false},
    {title: 'Brand', key: 'brand.name', sortable: false},
    {title: 'Model', key: 'model'},
    {title: 'Price', key: 'price'},
    {title: 'Currency', key: 'currency'},
    {title: 'Weight', key: 'weight'},
    {title: 'Status', key: 'status'},
    {title: '', key: 'actions'},
  ],
  droneTable: computed(() => store.state.droneStore),
  search: '',
  serverItems: [],
  totalItems: 0,
  options: {},
  loading: computed(() => store.state.loadingStore.isLoading),
})

const fetchData = async (newOptions: any) => {
  await store.dispatch('droneStore/fetchData', newOptions)
  options.value.options = newOptions
}

const deleteConfirm = id => {
  Swal.fire({
    title: 'Kayıt silinecek!',
    text: 'Silmek istediğinize emin misiniz?',
    icon: 'error',
    showCancelButton: true,
    confirmButtonText: 'Sil!',
    closeOnConfirm: false,
    cancelButtonText: 'İptal',
    customClass: {
      confirmButton: 'v-btn v-btn--elevated v-theme--light bg-success v-btn--density-default v-btn--size-default v-btn--variant-elevated',
      cancelButton: 'v-btn v-btn--elevated v-theme--light bg-error v-btn--density-default v-btn--size-default v-btn--variant-elevated',
    },
  }).then((value: { isConfirmed: any }) => {
    if (value.isConfirmed) {
      store.dispatch('droneStore/deleteDrone', id)
      options.value.droneTable.items = options.value.droneTable.items.filter(drone => drone.id !== id)
      options.value.droneTable.totalItems -= 1
    }
  })
}
</script>

<template>
  <div>
    <VCardText>
      <VRow>
        <VCol
          cols="12"
          offset-md="6"
          md="2"
        >
    <AddDrone/>

        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <AppTextField
            v-model="options.search"
            density="compact"
            placeholder="Search"
            append-inner-icon="tabler-search"
            single-line
            hide-details
            dense
            outlined
          />
        </VCol>
      </VRow>
    </VCardText>

    <!-- 👉 Data Table  -->
    <VDataTableServer
      v-model:options="options.options"
      :items="options.droneTable.items"
      :items-length="options.droneTable.totalItems"
      :headers="options.headers"
      :search="options.search"
      :items-per-page="10"
      :loading="options.loading"
      @update:options="fetchData"
    >
      <!-- Status -->
      <template #item.status="{ item }">
        <VChip
          :color="resolveStatusColor(item.raw.status)"
          :class="`text-${resolveStatusColor(item.raw.status)}`"
          size="small"
          class="font-weight-medium"
        >
          {{ resolveStatusText(item.raw.status) }}
        </VChip>
      </template>
      <!-- Actions -->
      <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <RouterLink :to="`drone/detail/${item.raw.id}`">
            <VBtn
              color="warning"
              size="small"
            >
              Detaylar
              <VIcon
                end
                icon="tabler-plus"
              />
            </VBtn>
          </routerlink>
          <VBtn
            color="error"
            size="small"
            @click="deleteConfirm(item.raw.id)"
          >
            Sil
            <VIcon
              end
              icon="tabler-trash"
            />
          </VBtn>
        </div>
      </template>
    </VDataTableServer>

  </div>
</template>
