import { API_URL_BASE, ENDPOINTS } from './constants';

const getResponse = (response: Response): Promise => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error(`Ошибка ${response.status}`));
};

/**
 * Обертка над fetch
 * @param endpoint endpoint запроса
 * @param options Объект опций аналогично fetch
 */
const request = (endpoint: string, options?: RequestInit) => {
  const url = `${API_URL_BASE}${endpoint}`;
  return fetch(url, options).then(getResponse);
};

export const refreshToken = async (): Promise => {
  const refreshData = await request(ENDPOINTS.REFRESH_TOKEN, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  });

  localStorage.setItem('accessToken', refreshData.accessToken);
  localStorage.setItem('refreshToken', refreshData.refreshToken);

  return refreshData;
};

/**
 * Обертка над request cо встроенным обновлением токена
 * при получении ошибки авторизации
 */
const fetchWithRefresh = async (endpoint: string, options: RequestInit) => {
  try {
    return await request(endpoint, options);
  } catch (error) {
    if (error.statusCode === 401 || error.statusCode === 403) {
      const refreshData = await refreshToken();

      return request(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken,
        },
      });
    } else {
      throw error;
    }
  }
};

export const getIngredients = (): Promise => {
  return request(ENDPOINTS.INGREDIENTS);
};

export const createOrder = (ingredientsIds: string[]): Promise => {
  return fetchWithRefresh(ENDPOINTS.ORDERS, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({
      ingredients: ingredientsIds,
    }),
  });
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
  return request(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise => {
  return request(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const logout = (): Promise => {
  return request(ENDPOINTS.LOGOUT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });
};

export const getUser = (): Promise => {
  return fetchWithRefresh(ENDPOINTS.USER_DATA, {
    method: 'GET',
    headers: {
      authorization: localStorage.getItem('accessToken'),
    },
  });
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
  return fetchWithRefresh(ENDPOINTS.USER_DATA, {
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
  });
};

export const passwordResetCheckEmail = (email: string): Promise => {
  return request(ENDPOINTS.PASSWORD_FORGOT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email,
    }),
  });
};

export const passwordReset = ({
  password,
  token,
}: {
  password: string;
  token: string;
}): Promise => {
  return request(ENDPOINTS.PASSWORD_RESET, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      password,
      token,
    }),
  });
};
