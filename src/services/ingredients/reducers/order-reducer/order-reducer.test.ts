import { describe, it, expect } from 'vitest';

import orderReducer, { initialState } from './order-reducer';

describe('orderSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = orderReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });
});
