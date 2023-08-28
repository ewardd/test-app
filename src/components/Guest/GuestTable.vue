<template>
  <div class="q-pa-md align-center">
    <q-table
      title="Список гостей"
      :rows="guestList"
      :columns="columns"
      row-key="id"
      class="customTable"
    >
      <template v-slot:body-cell-phones="props"
        ><GuestTablePhoneCell :phones="props.value" :id="props.key" />
      </template>
      <template v-slot:body-cell-emails="props"
        ><GuestTableEmailCell :emails="props.value" :id="props.key" />
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { QTableProps } from 'quasar';
import { getGuests } from 'src/api/websocketApi';
import GuestTableEmailCell from 'src/components/Guest/GuestTableEmailCell.vue';
import GuestTablePhoneCell from 'src/components/Guest/GuestTablePhoneCell.vue';
import { useDataStore } from 'src/stores/dataStore';

const dataStore = useDataStore();
const { guestList } = storeToRefs(dataStore);

getGuests();

const columns: QTableProps['columns'] = [
  {
    name: 'surname',
    align: 'center',
    label: 'Фамилия',
    field: 'surname',
  },
  {
    name: 'forename',
    align: 'center',
    label: 'Имя',
    field: 'forename',
  },
  {
    name: 'middlename',
    align: 'center',
    label: 'Отчество',
    field: 'middlename',
  },
  { name: 'phones', align: 'center', label: 'Телефон', field: 'phones' },
  { name: 'emails', align: 'center', label: 'Email', field: 'emails' },
  {
    name: 'birthday',
    align: 'center',
    label: 'Дата рождения',
    field: 'birthday',
  },
];
</script>

<style type="scss">
.customTable tbody td {
  font-size: 14px;
}
.customTable th {
  font-size: 16px;
}
</style>
