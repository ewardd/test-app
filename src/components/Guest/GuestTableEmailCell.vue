<template>
  <q-td style="width: 260px">
    <div class="q-pa-md column" style="gap: 8px">
      <div style="height: 16px" class="self-center">
        {{ emails[0] }}
      </div>
      <div style="height: 16px" class="self-center" v-if="emails.length > 1">
        {{ emails[1] }}
      </div>
      <q-input
        class="additionalInput"
        dense
        v-if="emails.length < 2"
        v-model="newEmail"
        borderless
        placeholder="Дополнительный email"
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
import { addGuestEmail } from 'src/api/websocketApi';
import { useDataStore } from 'src/stores/dataStore';
import { ref } from 'vue';
const store = useDataStore();

interface IProps {
  id: number;
  emails: string[];
}

const { id, emails } = defineProps<IProps>();
const newEmail = ref<string>('');
const onClick = () => {
  if (newEmail.value === '') return;
  store.addGuestEmail(id, newEmail.value);
  addGuestEmail({ id: id, email: newEmail.value });
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
