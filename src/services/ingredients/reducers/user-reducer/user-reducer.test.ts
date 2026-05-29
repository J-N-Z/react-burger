import { describe, it, expect } from 'vitest';

import userReducer, { setIsAuthChecked, setUser, initialState } from './user-reducer';

describe('userSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = userReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('должен менять значение флага isAuthChecked', () => {
    const result = userReducer(initialState, setIsAuthChecked(true));
    expect(result.isAuthChecked).toBe(true);
  });

  it('должен менять значение user', () => {
    const result = userReducer(
      initialState,
      setUser({ email: 'username@mail.ru', password: 'qwerty', name: 'username' })
    );
    expect(result.user).toEqual({
      email: 'username@mail.ru',
      password: 'qwerty',
      name: 'username',
    });
  });
});
