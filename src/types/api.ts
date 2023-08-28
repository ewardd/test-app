import { IFoodMenu, IGuestList } from 'src/types/models';

export enum ApiOperationEnum {
  DishList = 'dishes_list',
  GuestList = 'guests_list',
  GuestRegistration = 'guest_regestration',
  ChangeDishDescription = 'change_dish_desc',
  ChangeDishCost = 'change_dish_cost',
  AddGuestPhone = 'add_guestphone',
  AddGuestEmail = 'add_guestemail',
}

interface IApiResponseBase {
  operation: ApiOperationEnum;
}

export interface IApiDishList extends IApiResponseBase {
  operation: ApiOperationEnum.DishList;
  dishes_list: IFoodMenu;
}

export interface IApiGuestList extends IApiResponseBase {
  operation: ApiOperationEnum.GuestList;
  guest_list: IGuestList;
}

export interface IApiBasicResponse extends IApiResponseBase {
  status: boolean;
  operation:
    | ApiOperationEnum.ChangeDishCost
    | ApiOperationEnum.ChangeDishDescription
    | ApiOperationEnum.GuestRegistration
    | ApiOperationEnum.AddGuestEmail
    | ApiOperationEnum.AddGuestPhone;
}

export type IApiResponse = IApiDishList | IApiGuestList | IApiBasicResponse;
