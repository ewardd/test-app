<template>
  <q-page class="row justify-around">
    <FoodMenuGrid :dishes="dishList"></FoodMenuGrid>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { getDishes } from 'src/api/websocketApi';
import FoodMenuGrid from 'src/components/FoodMenu/FoodMenuGrid.vue';
import { useDataStore } from 'src/stores/dataStore';
import { onMounted } from 'vue';

const dataStore = useDataStore();
const { dishList } = storeToRefs(dataStore);

onMounted(() => {
  getDishes();
});
</script>
