import { defineStore } from 'pinia';
import { IFoodMenu, IGuestList } from 'src/types/models';

interface IDataStore {
  dishList: IFoodMenu;
  guestList: IGuestList;
}
export const useDataStore = defineStore('dataStore', {
  state: (): IDataStore => ({
    dishList: [],
    guestList: [],
  }),
  actions: {
    setDishList(dishList: IFoodMenu): void {
      this.dishList = dishList;
    },
    setGuestList(guestList: IGuestList): void {
      this.guestList = guestList;
    },
    setDishDescription(id: number, description: string): void {
      const dish = this.dishList.find((el) => el.dish_id === id);
      if (!dish) return;
      dish.dish_description = description;
    },
    setDishCost(id: number, cost: number): void {
      const dish = this.dishList.find((el) => el.dish_id === id);
      if (!dish) return;
      dish.dish_cost = cost;
    },
    addGuestPhoneNumber(id: number, phone: string): void {
      const guest = this.guestList.find((el) => el.id === id);
      if (!guest) return;
      guest.phones = [...guest.phones, phone];
    },
    addGuestEmail(id: number, email: string): void {
      const guest = this.guestList.find((el) => el.id === id);
      if (!guest) return;
      guest.emails = [...guest.emails, email];
    },
  },
});
