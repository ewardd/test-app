import { useDataStore } from 'src/stores/dataStore';
import { useWebsocketConnectionStore } from 'src/stores/websocketConnectionStore';
import { ApiOperationEnum, IApiResponse } from 'src/types/api';
import {
  IAddGuestEmailData,
  IAddGuestPhoneNumberData,
  IChangeDishCostData,
  IChangeDishDescriptionData,
  IGuestRegistrationData,
} from 'src/types/models';

export const socket = new WebSocket('ws://localhost:8080/fortest');
const formResponse: Array<(status: boolean) => void> = [];
export const formResponseSubscribe = (fn: (status: boolean) => void) => {
  formResponse.push(fn);
  return formResponse.filter((subscription) => subscription !== fn);
};
const KEY = 'wSEYY3tA9BpRNhkwfOmS';

socket.onopen = function () {
  useWebsocketConnectionStore().onConnect();
};
socket.onclose = function () {
  useWebsocketConnectionStore().onDisconnect();
};
socket.onerror = function (error) {
  console.error(error);
};
socket.onmessage = function (e) {
  const data: IApiResponse | undefined = JSON.parse(e.data);
  switch (data?.operation) {
    case ApiOperationEnum.DishList:
      useDataStore().setDishList(data.dishes_list);
      break;
    case ApiOperationEnum.GuestList:
      useDataStore().setGuestList(data.guest_list);
      break;
    case ApiOperationEnum.GuestRegistration:
      formResponse.forEach((fn) => fn(data.status));
      break;
    case ApiOperationEnum.ChangeDishCost:
    case ApiOperationEnum.ChangeDishDescription:
    case ApiOperationEnum.AddGuestEmail:
    case ApiOperationEnum.AddGuestPhone:
      break;
    default:
      console.error('Operation not supported ', data);
      return;
  }
};

export const getDishes = () => {
  socketSend(ApiOperationEnum.DishList);
};

export const getGuests = () => {
  socketSend(ApiOperationEnum.GuestList);
};

export const addGuest = (data: IGuestRegistrationData) => {
  socketSend(ApiOperationEnum.GuestRegistration, data);
};

export const changeDishDescription = (data: IChangeDishDescriptionData) => {
  socketSend(ApiOperationEnum.ChangeDishDescription, data);
};

export const changeDishCost = (data: IChangeDishCostData) => {
  socketSend(ApiOperationEnum.ChangeDishCost, data);
};

export const addGuestPhoneNumber = (data: IAddGuestPhoneNumberData) => {
  socketSend(ApiOperationEnum.AddGuestPhone, data);
};

export const addGuestEmail = (data: IAddGuestEmailData) => {
  socketSend(ApiOperationEnum.AddGuestEmail, data);
};

const socketSend = <T extends object | undefined = undefined>(
  operation: ApiOperationEnum,
  data?: T
) => {
  socket.send(
    JSON.stringify({
      operation,
      key: KEY,
      ...data,
    })
  );
};
