<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'

const props = defineProps<{
  bankAccounts: []
}>()

const emit = defineEmits<Emit>()

interface Emit {
  (e: 'openUpdate', value: any): void
}

const openUpdateBankAccount = (val: any) => {
  emit('openUpdate', ref(val))
}

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Hesap Adı', sortable: false, key: 'accountName' },
  { title: 'IBAN', key: 'iban' },
  { title: '', key: 'actions', sortable: false },
]
</script>

<template>
  <div>
    <VDataTable
      :headers="headers"
      :items="props.bankAccounts"
      :items-per-page="5"
    >
      <template #item.actions="{ item }">
        <VBtn
          size="small"
          color="warning"
          @click="openUpdateBankAccount(item.raw)"
        >
          <VIcon>
            mdi-pencil
          </VIcon>
        </VBtn>
      </template>
    </VDataTable>
  </div>
</template>
