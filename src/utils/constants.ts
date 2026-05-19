import type { StatusKeys } from '@utils/types';

export const API_URL_BASE = 'https://new-stellarburgers.education-services.ru/api/';

export const ENDPOINTS = {
  INGREDIENTS: 'ingredients',
  ORDERS: 'orders',
  REGISTER: 'auth/register',
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
  REFRESH_TOKEN: 'auth/token',
  USER_DATA: 'auth/user',
  PASSWORD_FORGOT: 'password-reset',
  PASSWORD_RESET: 'password-reset/reset',
} as const;

export const SOCKET_ORDERS_ALL_URL =
  'wss://new-stellarburgers.education-services.ru/orders/all';
export const SOCKET_ORDERS_USER_URL =
  'wss://new-stellarburgers.education-services.ru/orders';

export const FORGOT_PASSWORD_STORAGE_KEY = 'forgotPasswordPageVisited';

export const orderStatus: Record<StatusKeys, string> = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен',
};
