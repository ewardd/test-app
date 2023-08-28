<template>
  <div
    class="col-4 q-pt-xl card align-center"
    v-for="dish in props.dishes"
    :key="dish.dish_id"
  >
    <FoodMenuItem :dish="dish"></FoodMenuItem>
  </div>
</template>

<script setup lang="ts">
import FoodMenuItem from 'src/components/FoodMenu/FoodMenuItem.vue';
import { IFoodMenu } from 'src/types/models';

interface IProps {
  dishes: IFoodMenu;
}
const props = defineProps<IProps>();
</script>

<style type="scss">
.card {
  max-width: 400px;
}
</style>
src/types/models
