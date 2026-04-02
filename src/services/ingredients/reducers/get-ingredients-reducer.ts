import { createSlice } from '@reduxjs/toolkit';

import { loadIngredients } from '../actions';

import type { TIngredient } from '@utils/types';

type TState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TState = {
  ingredients: [],
  isLoading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIngredientsError: (state) => state.error,
    getIngredientsIsLoadingSelector: (state) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload.data;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error?.message ?? 'Unknown error';
      });
  },
});

export default ingredientsSlice.reducer;

export const { getIngredientsSelector, getIngredientsIsLoadingSelector } =
  ingredientsSlice.selectors;
