<script setup lang="ts">
import {VDataTableServer} from 'vuetify/labs/VDataTable'
import {useStore} from 'vuex'
import {VDataTable} from 'vuetify/labs/VDataTable'

const store = useStore()
const search = ref('')
const dateRange = ref({start: null, end: null})

const fetchData = async (newOptions: any) => {
  await store.dispatch('bookingStore/fetchData', newOptions)
  options.value.options = newOptions
}
const resolveStatusColor = status => {
  if (status === 'Approved')
    return 'success'
  if (status === 'Completed')
    return 'success'
  if (status === 'Cancelled')
    return 'error'
  if (status === 'Pending')
    return 'warning'

  return 'primary'
}


const resolveStatusText = status => {
  if (status === 'Available')
    return 'Aktif'
  if (status === 'Under Maintenance')
    return 'Bakımda'
  if (status === 'Unavailable')
    return 'Pasif'
}


// 👉 methods
const options = ref({
  itemsPerPage: 5,
  headers: [
    {title: '#', key: 'id'},
    {title: 'User', key: 'user.username'},
    {title: 'Drone Category', key: 'drone.category.name', sortable: false},
    {title: 'Drone Brand', key: 'drone.brand.name', sortable: false},
    {title: 'Drone Model', key: 'drone.model'},
    {title: 'Start Date', key: 'start_datetime'},
    {title: 'End Date', key: 'end_datetime'},
    {title: 'Total Price', key: 'total_price'},
    {title: 'Status', key: 'status'},
    {title: 'Created At', key: 'created_at'},
    {title: 'Updated At', key: 'updated_at'},
    {title: '', key: 'actions'}
  ],
  bookingTable: computed(() => store.state.bookingStore),
  search: '',
  serverItems: [],
  totalItems: 0,
  options: {},
  loading: computed(() => store.state.loadingStore.isLoading),
})

const searchOptions = ref({
  itemsPerPage: 5,
  headers: [
    {title: '#', key: 'id'},
    {title: 'Drone Category', key: 'category.name', sortable: false},
    {title: 'Drone Brand', key: 'brand.name', sortable: false},
    {title: 'Drone Model', key: 'model'},
    {title: 'Total Price', key: 'total_price'},
    {title: 'Currency', key: 'currency'},
    {title: '', key: 'actions'}
  ],
  searchResults: computed(() => store.state.droneStore),
  search: '',
  serverItems: [],
  totalItems: 0,
  options: {},
  loading: computed(() => store.state.loadingStore.isLoading),
})

const fetchAvailableData = async (newOptions: any) => {
  // Add start_date and end_date to the options
  newOptions.start_date = dateRange.value.start
  newOptions.end_date = dateRange.value.end

  await store.dispatch('droneStore/fetchAvailableDrones', newOptions)
}

const changeStatus = data => {
  Swal.fire({
    title: 'Statü değiştirilecek!',
    text: 'İşlemi yapmak için emin misiniz?',
    icon: 'error',
    showCancelButton: true,
    confirmButtonText: 'Evet!',
    closeOnConfirm: false,
    cancelButtonText: 'İptal',
    customClass: {
      confirmButton: 'v-btn v-btn--elevated v-theme--light bg-success v-btn--density-default v-btn--size-default v-btn--variant-elevated',
      cancelButton: 'v-btn v-btn--elevated v-theme--light bg-error v-btn--density-default v-btn--size-default v-btn--variant-elevated',
    },
  }).then((value: { isConfirmed: any }) => {
    if (value.isConfirmed) {
      const booking = data.data.raw

      booking.status = data.status
      console.log(booking)
      store.dispatch('bookingStore/updateBooking', booking)
    }
  })
}


const createBooking = drone => {
  Swal.fire({
    title: 'Rezervasyon yapılacak!',
    text: 'Rezervasyon yapmak istediğinize emin misiniz?',
    icon: 'success',
    showCancelButton: true,
    confirmButtonText: 'Evet!',
    closeOnConfirm: false,
    cancelButtonText: 'İptal',
    customClass: {
      confirmButton: 'v-btn v-btn--elevated v-theme--light bg-success v-btn--density-default v-btn--size-default v-btn--variant-elevated',
      cancelButton: 'v-btn v-btn--elevated v-theme--light bg-error v-btn--density-default v-btn--size-default v-btn--variant-elevated',
    },
  }).then((value: { isConfirmed: any }) => {
    if (value.isConfirmed) {
      const booking = {
        start_datetime: dateRange.value.start,
        end_datetime: dateRange.value.end,
        total_price: drone.total_price,
        status: "Approved",
        drone: drone.value,
      };

      store.dispatch('bookingStore/createBooking', booking)
      options.value.serverItems = [];
      store.dispatch('bookingStore/fetchData', options.value.options)
    }
  })
}
</script>

<template>
  <div>
    <VCard
      class="mb-6"
    >

      <VCardText>
        <VRow>
          <VCol cols="4" md="4">
            <AppDateTimePicker
              v-model="dateRange.start"
              label="Başlangıç Tarihi"
            />
          </VCol>
          <VCol cols="4" md="4">
            <AppDateTimePicker
              v-model="dateRange.end"
              label="Bitiş Tarihi"
            />
          </VCol>
          <VCol cols="4" md="4" justify="end" align-self="end">
            <VBtn @click="fetchAvailableData">Ara</VBtn>
          </VCol>
        </VRow>
        <VRow v-if="searchOptions.searchResults.availableItems.length > 0">

          <VDataTable
            v-model:options="searchOptions.options"
            :items="searchOptions.searchResults.availableItems"
            :server-items-length="searchOptions.searchResults.availableItems.length"
            :headers="searchOptions.headers"
            :items-per-page="5"
            class="text-no-wrap"
          >
            <template #item.actions="{ item }">
              <div class="d-flex gap-1">

                <VBtn
                  color="success"
                  size="small"
                  @click="createBooking(item)"
                >
                  Rezerve Et
                  <VIcon
                    end
                    icon="tabler-plus"
                  />
                </VBtn>

              </div>
            </template>
          </VDataTable>

        </VRow>
      </VCardText>
    </VCard>

    <VCardText>
      <VRow>
        <VCol
          cols="12"
          offset-md="6"
          md="2"
        >

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
      :items="options.bookingTable.items"
      :items-length="options.bookingTable.totalItems"
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
          {{ item.raw.status }}
        </VChip>
      </template>
      <!-- Actions -->
      <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <VBtn
            v-if="item.raw.status == 'Pending'"
            color="success"
            size="small"
            @click="changeStatus({data: item,status :'Approved'})"
          >
            Onayla
            <VIcon
              end
              icon="tabler-plus"
            />
          </VBtn>
          <VBtn
            v-if="item.raw.status == 'Approved'"
            color="error"
            size="small"
            @click="changeStatus({data: item,status :'Cancelled'})"
          >
            İptal Et
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
