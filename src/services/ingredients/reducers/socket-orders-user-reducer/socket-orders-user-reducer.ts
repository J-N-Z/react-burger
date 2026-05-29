import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TSocketMessage } from '@utils/types';

type SocketState = {
  isConnected: boolean;
  messages: TSocketMessage[];
  error: string | null;
  isLoading: boolean;
};

export const initialState: SocketState = {
  isConnected: false,
  messages: [],
  error: null,
  isLoading: false,
};

export const SLICE_NAME = 'socketOrdersUser';

export const socketOrdersUserSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    // Управляющие редьюсеры
    connect: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    disconnect: (state) => {
      state.isConnected = false;
      state.messages = [];
      state.isLoading = false;
    },
    // Событийные редьюсеры
    onOpen: (state) => {
      state.isLoading = false;
      state.isConnected = true;
      state.error = null;
    },
    onMessage: (state, action: PayloadAction<TSocketMessage>) => {
      state.messages.push(action.payload);
    },
    onError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    onClose: (state) => {
      state.isConnected = false;
      state.isLoading = false;
    },
  },
  selectors: {
    selectMessages: (state) => state.messages,
    selectOrders: (state) => state.messages[state.messages.length - 1]?.orders,
  },
});

export const { connect, disconnect, onOpen, onMessage, onError, onClose } =
  socketOrdersUserSlice.actions;

export const { selectOrders } = socketOrdersUserSlice.selectors;

export default socketOrdersUserSlice.reducer;
