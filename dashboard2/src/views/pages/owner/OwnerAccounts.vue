<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'

const props = defineProps<{
  owners: []
}>()

const emit = defineEmits<Emit>()

interface Emit {
  (e: 'openUpdate', value: any): void
}

const openOwnerUpdate = (val: any) => {
  emit('openUpdate', ref(val))
}

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'İsim Soyisim', sortable: false, key: 'fullname' },
  { title: 'Email', key: 'email' },
  { title: 'Durum', key: 'isActive' },
  { title: '', key: 'actions', sortable: false },
]

const resolveStatusColor = status => {
  return status === true ? 'success' : 'error'
}

const resolveStatusText = status => {
  return status === true ? 'Aktif' : 'Pasif'
}
</script>

<template>
  <div>
    <VDataTable
      :headers="headers"
      :items="props.owners"
      :items-per-page="5"
    >
      <!-- Status -->
      <template #item.isActive="{ item }">
        <VChip
          :color="resolveStatusColor(item.raw.isActive)"
          :class="`text-${resolveStatusColor(item.raw.isActive)}`"
          size="small"
          class="font-weight-medium"
        >
          {{ resolveStatusText(item.raw.isActive) }}
        </VChip>
      </template>
      <template #item.actions="{ item }">
        <VBtn
          size="small"
          color="success"
          @click="openOwnerUpdate(item.raw)"
        >
          <VIcon>
            mdi-pencil
          </VIcon>
        </VBtn>
      </template>
    </VDataTable>
  </div>
</template>
