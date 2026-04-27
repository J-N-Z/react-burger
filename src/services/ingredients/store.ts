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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
