import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { socketOrdersAllSlice } from '@services/ingredients/reducers/socket-orders-all-reducer';
import { socketOrdersUserSlice } from '@services/ingredients/reducers/socket-orders-user-reducer';

import { socketOrdersAllMiddleware } from './middleware/socket-orders-all-middleware';
import { socketOrdersUserMiddleware } from './middleware/socket-orders-user-middleware';
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
  userSlice,
  socketOrdersAllSlice,
  socketOrdersUserSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(socketOrdersAllMiddleware)
      .concat(socketOrdersUserMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
