import { defineStore } from 'pinia';
import { socket } from 'src/api/websocketApi';

export const useWebsocketConnectionStore = defineStore(
  'websocketConnectionStore',
  {
    state: () => ({
      connected: false,
    }),
    actions: {
      disconnect() {
        socket.close();
        this.connected = false;
      },
      onConnect() {
        this.connected = true;
      },
      onDisconnect() {
        this.connected = false;
      },
    },
  }
);
