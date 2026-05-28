import { describe, it, expect } from 'vitest';

import ingredientsReducer from './get-ingredients-reducer';

describe('ingredientsSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = ingredientsReducer(undefined, { type: '' });
    expect(result).toEqual({
      ingredients: [],
      isLoading: false,
      error: null,
    });
  });
});
