import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  ingredientsSlice,
  orderSlice,
  draggableIngredientSlice,
  userSlice,
} from './reducers';

const rootReducer = combineSlices(
  ingredientsSlice,
  orderSlice,
  draggableIngredientSlice,
  userSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
