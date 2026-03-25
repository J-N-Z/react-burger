import { createAsyncThunk } from '@reduxjs/toolkit';

import { createOrder as sendOrder } from '../../../utils/api';

export const createOrder = createAsyncThunk(
  'ingredients/createOrder',
  async (ingredientsIds: string[]) => {
    const response = await sendOrder(ingredientsIds);
    return response;
  }
);
