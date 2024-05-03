<script setup lang="ts">
import { useStore } from 'vuex'
import {computed, ref} from 'vue'
import { requiredValidator } from '@validators'

const currentTab = ref(2)

const route = useRoute()
const store = useStore()

onMounted(() => {
  store.dispatch('droneStore/droneDetails', Number(route.params.id))
})

const drone = computed(() => store.state.droneStore.drone)
const definitions = computed(() => store.state.initStore.definition)
const isLoading = computed(() => store.state.loadingStore.isLoading)
const categories = computed(() => store.state.categoryStore.categories)
const brands = computed(() => store.state.brandStore.brands)

store.dispatch('fetchCategories')
store.dispatch('fetchBrands')


const statusChoices = [
  { value: 'Available', text: 'Available' },
  { value: 'Unavailable', text: 'Unavailable' },
  { value: 'Under Maintenance', text: 'Under Maintenance' },
]

const resolveDefinition = (key: string, value: string) => {
  const definition = definitions.value[key]
  let definitionItem = {}
  if (definition) {
    Object.entries(definition).forEach(([oKey, oValue]) => {
      if (oValue.key === value)
        definitionItem = oValue
    })

    if (definitionItem)
      return definitionItem.value
  }

  return value
}

const formDetailSubmit = () => {
  console.debug('formDetailSubmit')
  store.dispatch('droneStore/updateDrone', { id: drone.value.id, drone: drone.value })
}
</script>

<template>
  <VRow v-if="drone">
    <VCol cols="12">
      <VCard>
        <VCol
          md="12"
          sm="12"
        >
          <VForm>
            <VRow>
              <VCol
                cols="12"
                sm="6"
              >
                <AppTextField
                  v-model="drone.id"
                  label="#"
                  disabled
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <AppAutocomplete
                  v-model="drone.category"
                  label="Category"
                  item-title="name"
                  :items="categories"
                  return-object
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <AppAutocomplete
                  v-model="drone.brand"
                  label="Brand"
                  item-title="name"
                  :items="brands"
                  return-object
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <AppTextField
                  v-model="drone.model"
                  label="Model"
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <AppTextField
                  v-model="drone.price"
                  label="Price"
                  type="number"
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <AppTextField
                  v-model="drone.currency"
                  label="Currency"
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <AppTextField
                  v-model="drone.weight"
                  label="Weight"
                  type="number"
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <AppSelect
                  v-model="drone.status"
                  :items="statusChoices"
                  item-title="value"
                  item-value="text"
                  label="Status"
                  :rules="[requiredValidator]"
                  placeholder="Status"
                />
              </VCol>
            </VRow>
            <VCol cols="12">
              <VBtn
                color="success"
                class="float-right mr-4"
                @click="formDetailSubmit"
              >
                Kaydet
                <VIcon
                  end
                  icon="tabler-checkbox"
                />
              </VBtn>
            </VCol>
          </VForm>
        </VCol>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}

.gmv-map-container,
.gmv-map {
  min-block-size: 300px;
  min-inline-size: 300px;
}

.autoCompleteDiv {
  :first-child {
    inline-size: 100%;
  }
}

.delete-button {
  position: absolute;
  display: none;
  inline-size: 50%;
  inset-block-start: 50%;
  inset-inline: 0;
  margin-block: auto;
  margin-inline: auto;
  text-align: center;
}

.hover-container:hover img {
  opacity: 0.5;
}

.hover-container:hover .delete-button {
  display: block;
}

.calendars-checkbox {
  .v-label {
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
    opacity: var(--v-high-emphasis-opacity);
  }
}

.calendar-add-event-drawer {
  &.v-navigation-drawer:not(.v-navigation-drawer--temporary) {
    border-end-start-radius: 0.375rem;
    border-start-start-radius: 0.375rem;
  }
}

.calendar-date-picker {
  display: none;

  + .flatpickr-input {
    + .flatpickr-calendar.inline {
      border: none;
      box-shadow: none;

      .flatpickr-months {
        border-block-end: none;
      }
    }
  }

  & ~ .flatpickr-calendar .flatpickr-weekdays {
    margin-block: 0 4px;
  }
}
</style>

<style lang="scss" scoped>
.v-layout {
  overflow: visible !important;

  .v-card {
    overflow: visible;
  }
}
</style>
