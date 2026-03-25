import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  ingredientsSlice,
  activeIngredientSlice,
  orderSlice,
  draggableIngredientSlice,
} from './reducers';

const rootReducer = combineSlices(
  ingredientsSlice,
  activeIngredientSlice,
  orderSlice,
  draggableIngredientSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
