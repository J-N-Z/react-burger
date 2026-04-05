import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  register,
  login,
  logout,
  updateRefreshToken,
  updateUser,
  passwordResetCheckEmail,
  passwordReset,
} from '../../../utils/api';

export const registerAction = createAsyncThunk(
  'user/register',
  async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await register({
      name,
      email,
      password,
    });
    return response;
  }
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await login({
      email,
      password,
    });

    if (response.success) {
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
    }

    return response;
  }
);

export const updateUserAction = createAsyncThunk(
  'user/updateData',
  async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await updateUser({
      name,
      email,
      password,
    });
    return response;
  }
);

export const logoutAction = createAsyncThunk('user/logout', async () => {
  const response = await logout();

  if (response.success) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  return response;
});

export const refreshTokenAction = createAsyncThunk('user/refresh', async () => {
  const response = await updateRefreshToken();

  if (response.success) {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  return response;
});

export const passwordResetCheckEmailAction = createAsyncThunk(
  'user/resetPassword',
  async ({ email, callback }: { email: string; callback: () => void }) => {
    const response = await passwordResetCheckEmail(email);

    if (response.success) {
      callback();
    }

    return response;
  }
);

export const passwordResetAction = createAsyncThunk(
  'user/resetPassword',
  async ({
    password,
    token,
    callback,
  }: {
    password: string;
    token: string;
    callback: () => void;
  }) => {
    const response = await passwordReset({
      password,
      token,
    });

    if (response.success) {
      callback();
    }

    return response;
  }
);
