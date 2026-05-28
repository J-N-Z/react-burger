import { describe, it, expect } from 'vitest';

import orderReducer from './order-reducer';

describe('orderSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = orderReducer(undefined, { type: '' });
    expect(result).toEqual({
      orderNumber: 0,
      isLoading: false,
      error: null,
    });
  });
});
