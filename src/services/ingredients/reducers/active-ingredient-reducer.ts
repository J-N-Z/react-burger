import { createSlice } from '@reduxjs/toolkit';

/***
 * Слайс для модального окна выбранного ингредиента в компоненте BurgerIngredients
 */

const initialState = { activeIngredient: null };

export const activeIngredientSlice = createSlice({
  name: 'activeIngredient',
  initialState,
  reducers: {
    setActiveIngredient: (state, action) => {
      state.activeIngredient = action.payload;
    },
  },
  selectors: {
    getActiveIngredientSelector: (state) => state.activeIngredient,
  },
});

export const { getActiveIngredientSelector } = activeIngredientSlice.selectors;

export const { setActiveIngredient } = activeIngredientSlice.actions;
