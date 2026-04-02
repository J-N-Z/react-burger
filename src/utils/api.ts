import { API_URL_INGREDIENTS, API_URL_ORDERS } from './constants';

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
