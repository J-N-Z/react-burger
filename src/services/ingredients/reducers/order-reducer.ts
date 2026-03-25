import { createSlice } from '@reduxjs/toolkit';

import { createOrder } from '../actions';

/***
 * Слайс для модального окна с заказами, компонент OrderDetails
 */

const initialState = {
  orderNumber: 0,
  isLoading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderNumberSelector: (state) => state.orderNumber,
    getOrderNumberIsLoadingSelector: (state) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.order.number) {
          state.orderNumber = action.payload?.order.number;
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error?.message ?? 'Unknown error';
      });
  },
});

export const { getOrderNumberSelector, getOrderNumberIsLoadingSelector } =
  orderSlice.selectors;
