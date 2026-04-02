import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredients } from '../../../utils/api';

export const loadIngredients = createAsyncThunk(
  'ingredients/loadIngredients',
  async () => {
    const response = await getIngredients();
    return response;
  }
);
