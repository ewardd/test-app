export interface IDish {
  dish_id: number;
  dish_name: string;
  dish_cost: number;
  dish_image: string;
  dish_description: string;
}

export type IFoodMenu = IDish[];

export interface IGuest {
  id: number;
  surname: string;
  forename: string;
  middlename: string;
  birthday: string;
  address: string;
  phones: string[];
  emails: string[];
}

export interface IGuestRegistrationData {
  surname: string;
  forename: string;
  middlename: string;
  phone: string | null;
  email: string | null;
  birthday: string;
}

export interface IChangeDishDescriptionData {
  id: number;
  desc_value: string;
}

export interface IChangeDishCostData {
  id: number;
  cost_value: number;
}

export interface IAddGuestPhoneNumberData {
  id: number;
  phone: string;
}

export interface IAddGuestEmailData {
  id: number;
  email: string;
}

export type IGuestList = IGuest[];
