import {
  API_URL_INGREDIENTS,
  API_URL_ORDERS,
  API_URL_REGISTER,
  API_URL_LOGIN,
  API_URL_REFRESH_TOKEN,
  API_URL_LOGOUT,
  API_URL_USER_DATA,
  API_URL_USER_PASSWORD_FORGOT,
  API_URL_USER_PASSWORD_RESET,
} from './constants';

const getResponse = (response: Response): Promise => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error(`Ошибка ${response.status}`));
};

export const getIngredients = (): Promise => {
  return fetch(API_URL_INGREDIENTS).then(getResponse);
};

export const createOrder = (ingredientsIds: string[]): Promise => {
  return fetch(API_URL_ORDERS, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      ingredients: ingredientsIds,
    }),
  }).then(getResponse);
};

/********************************************************
 * Регистрация, авторизация, обновление данных, токены
 ********************************************************/

export const register = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise => {
  return fetch(API_URL_REGISTER, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then(getResponse);
};

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise => {
  return fetch(API_URL_LOGIN, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(getResponse);
};

export const logout = (): Promise => {
  return fetch(API_URL_LOGOUT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(getResponse);
};

export const getUser = (): Promise => {
  return fetch(API_URL_USER_DATA, {
    method: 'GET',
    headers: {
      authorization: localStorage.getItem('accessToken'),
    },
  }).then(getResponse);
};

export const updateUser = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise => {
  return fetch(API_URL_USER_DATA, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then(getResponse);
};

export const updateRefreshToken = (): Promise => {
  return fetch(API_URL_REFRESH_TOKEN, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(getResponse);
};

export const passwordResetCheckEmail = (email: string): Promise => {
  return fetch(API_URL_USER_PASSWORD_FORGOT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email,
    }),
  }).then(getResponse);
};

export const passwordReset = ({
  password,
  token,
}: {
  password: string;
  token: string;
}): Promise => {
  return fetch(API_URL_USER_PASSWORD_RESET, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      password,
      token,
    }),
  }).then(getResponse);
};
