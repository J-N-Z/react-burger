import { createSlice } from '@reduxjs/toolkit';

import {
  registerAction,
  loginAction,
  logoutAction,
  updateUserAction,
} from '../actions/user-actions';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TUser } from '@utils/types';

/***
 * Слайс для авторизации, регистрации, хранения пользователя
 */

type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthChecked: boolean;
};

const initialState: TUserState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const { selectIsLoading, selectError, selectUser, selectIsAuthChecked } =
  userSlice.selectors;

export const { setIsAuthChecked, setUser } = userSlice.actions;
