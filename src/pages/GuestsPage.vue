<template>
  <q-tabs :vertical="false" v-model="tab">
    <q-tab name="add-guest" label="Регистрация гостя" />
    <q-tab name="guest-list" label="Гости" />
  </q-tabs>
  <q-tab-panels v-model="tab">
    <q-tab-panel name="add-guest"><GuestRegistrationForm /></q-tab-panel>
    <q-tab-panel name="guest-list"><GuestTable></GuestTable></q-tab-panel
  ></q-tab-panels>
</template>

<script setup lang="ts">
import GuestRegistrationForm from 'src/components/Guest/GuestRegistrationForm.vue';
import GuestTable from 'src/components/Guest/GuestTable.vue';
import { ref } from 'vue';

const tab = ref('add-guest');
</script>
