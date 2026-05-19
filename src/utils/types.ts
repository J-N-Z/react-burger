export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TIngredientWithId = TIngredient & { id: string };

export type TIngredientsResponse = {
  data: TIngredient[];
  success: boolean;
};

export type TUser = {
  email: string;
  password: string;
  name: string;
};

export type TResponseBase = {
  success: boolean;
};

export type TOrder = {
  createdAt: string;
  ingredients: TIngredient[];
  name: string;
  number: number;
  owner: {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
  };
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type StatusKeys = 'created' | 'pending' | 'done';

export type TOrderBase = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: StatusKeys;
  updatedAt: string;
  _id: string;
};

export type TSocketMessage = {
  orders: TOrderBase[];
  success: boolean;
  total: number;
  totalToday: number;
};
