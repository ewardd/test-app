<template>
  <q-td style="width: 260px">
    <div class="q-pa-md column" style="gap: 8px">
      <div style="height: 16px" class="self-center">
        {{ phones[0] }}
      </div>
      <div style="height: 16px" class="self-center" v-if="phones.length > 1">
        {{ phones[1] }}
      </div>
      <q-input
        class="additionalInput"
        dense
        v-if="phones.length < 2"
        v-model="newPhone"
        borderless
        placeholder="Дополнительный номер"
        @keyup.enter="onClick"
        maxlength="16"
      >
        <template v-slot:append>
          <q-btn
            icon="subdirectory_arrow_left"
            unelevated
            size="8px"
            dense
            color="primary"
            @click="onClick"
        /></template>
      </q-input>
    </div>
  </q-td>
</template>

<script setup lang="ts">
import { addGuestPhoneNumber } from 'src/api/websocketApi';
import { useDataStore } from 'src/stores/dataStore';
import { ref } from 'vue';
const store = useDataStore();

interface IProps {
  id: number;
  phones: string[];
}

const { id, phones } = defineProps<IProps>();
const newPhone = ref<string>('');
const onClick = () => {
  if (newPhone.value === '') return;
  store.addGuestPhoneNumber(id, newPhone.value);
  addGuestPhoneNumber({ id: id, phone: newPhone.value });
};
</script>

<style type="scss">
.additionalInput {
  border: 1px solid lightgrey;
  border-radius: 4px;
  .q-field__control {
    height: 16px;
    &:after {
      height: 16px;
    }
    .q-field__append {
      height: 16px;
    }
  }
  .q-field__native {
    padding: 0px 4px;
  }
}
</style>
