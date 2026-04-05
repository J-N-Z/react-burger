import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUser } from '@utils/api';
import { isTokenExists } from '@utils/tokens';

import { setUser, setIsAuthChecked } from '../reducers/user-reducer';

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    try {
      if (isTokenExists()) {
        const response = await getUser();
        dispatch(setUser(response.user));
      }
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  }
);
