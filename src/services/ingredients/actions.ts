import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredients, createOrder as sendOrder } from '../../utils/api';

export const loadIngredients = createAsyncThunk(
  'ingredients/loadIngredients',
  async () => {
    const response = await getIngredients();
    return response;
  }
);

export const createOrder = createAsyncThunk(
  'ingredients/createOrder',
  async (ingredientsIds: string[]) => {
    const response = await sendOrder(ingredientsIds);
    return response;
  }
);
