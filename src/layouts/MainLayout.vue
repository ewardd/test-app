<template>
  <q-layout view="hHh lpr fff">
    <q-header bordered>
      <HeaderMenu />
    </q-header>

    <q-page-container>
      <router-view v-if="connected" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import HeaderMenu from 'src/components/HeaderMenu.vue';
import { useWebsocketConnectionStore } from 'src/stores/websocketConnectionStore';

const store = useWebsocketConnectionStore();
const { connected } = storeToRefs(store);
</script>
