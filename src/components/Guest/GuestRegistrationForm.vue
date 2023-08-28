<template>
  <div class="q-pa-lg row justify-center">
    <q-form
      style="width: 400px"
      ref="formRef"
      class="q-gutter-xs"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-input
        filled
        v-model="formData.surname"
        label="Фамилия"
        lazy-rules
        :rules="nameRules"
      />
      <q-input
        filled
        v-model="formData.forename"
        label="Имя"
        lazy-rules
        :rules="nameRules"
      />
      <q-input
        filled
        v-model="formData.middlename"
        label="Отчество"
        lazy-rules
        :rules="nameRules"
      />
      <q-input
        filled
        v-model="formData.birthday"
        label="Дата рождения"
        mask="date"
        :rules="['date']"
        errorMessage="Неправильный формат даты"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer" size="32px">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="formData.birthday">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        filled
        type="tel"
        v-model="formData.phone"
        label="Телефон"
        lazy-rules
        :rules="phoneNumberRules"
      />
      <q-input
        filled
        v-model="formData.email"
        label="Email"
        lazy-rules
        :rules="['email']"
        errorMessage="Неправильный формат Email"
      />
      <div class="row justify-end">
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ValidationRule, useQuasar } from 'quasar';
import { addGuest, formResponseSubscribe } from 'src/api/websocketApi';
import { IGuestRegistrationData } from 'src/types/models';
import { VNodeRef, onMounted, ref } from 'vue';

const nameRules: ValidationRule[] = [
  (val: string) => (val && val.length > 0) || 'Поле не может быть пустым',
  (val: string) => (val && val.length < 32) || 'Допустимо не более 32 символов',
];
const phoneRegex =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
const phoneNumberRules: ValidationRule[] = [
  (val: string) => (val && val.length > 0) || 'Поле не может быть пустым',
  (val: string) =>
    (val && phoneRegex.test(val)) || 'Неправильный формат номера телефона',
];

const defaultData: IGuestRegistrationData = {
  surname: '',
  forename: '',
  middlename: '',
  phone: '',
  email: '',
  birthday: '',
};
const formData = ref({ ...defaultData });
const formRef = ref<VNodeRef | null>(null);
const $q = useQuasar();

const onSubmit = () => {
  {
    addGuest(formData.value);
  }
};
const onReset = () => {
  formData.value = { ...defaultData };
  setTimeout(() => {
    formRef.value?.resetValidation();
  }, 0);
};
const onRegistered = (status: boolean) => {
  if (status) {
    onReset();
    $q.notify({
      message: 'Гость зарегистрирован',
      color: 'green',
    });
  } else {
    $q.notify({
      message: 'Ошибка при регистрации гостя',
      color: 'red',
    });
  }
};

onMounted(() => formResponseSubscribe(onRegistered));
</script>
src/types/models
