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

export const FORGOT_PASSWORD_STORAGE_KEY = 'forgotPasswordPageVisited';
