<template>
  <q-card class="card">
    <q-card-section class="text-center text-h6">{{
      props.dish.dish_name
    }}</q-card-section>
    <q-separator />
    <q-card-section align="center">
      <img
        style="width: fit-content"
        :src="`data:image/png;base64,${props.dish.dish_image}`"
      />
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-input
        autogrow
        dense
        borderless
        v-model="dishDescription"
        maxlength="200"
      />
    </q-card-section>
    <q-separator />
    <q-card-section style="padding: 0 16px 0 16px">
      <q-input type="number" dense borderless v-model="dishCost" prefix="$" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { debounce } from 'quasar';
import { changeDishCost, changeDishDescription } from 'src/api/websocketApi';
import { useDataStore } from 'src/stores/dataStore';
import { IDish } from 'src/types/models';
import { computed } from 'vue';

interface IProps {
  dish: IDish;
}

const props = defineProps<IProps>();

const dataStore = useDataStore();

const dishDescription = computed({
  get() {
    return props.dish.dish_description;
  },
  set(newValue: string) {
    dataStore.setDishDescription(props.dish.dish_id, newValue);
    updateDishDescriptionDebounced(newValue);
  },
});
const updateDishCostDebounced = debounce((cost: number) => {
  changeDishCost({ id: props.dish.dish_id, cost_value: cost });
}, 500);

const dishCost = computed({
  get() {
    return props.dish.dish_cost;
  },
  set(newValue: number | string) {
    const newDistCost =
      typeof newValue === 'string' ? parseInt(newValue) : newValue;
    dataStore.setDishCost(props.dish.dish_id, newDistCost);
    updateDishCostDebounced(newDistCost);
  },
});
const updateDishDescriptionDebounced = debounce((description: string) => {
  changeDishDescription({ id: props.dish.dish_id, desc_value: description });
}, 500);
</script>

<style lang="scss">
.bordered {
  border: $dark solid 1px;
}
.card {
  width: 100%;
  max-width: 400px;
}
</style>
src/types/models
