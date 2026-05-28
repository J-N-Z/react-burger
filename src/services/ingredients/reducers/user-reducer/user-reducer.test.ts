import { describe, it, expect } from 'vitest';

import userReducer, { setIsAuthChecked, setUser } from './user-reducer';

describe('userSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = userReducer(undefined, { type: '' });
    expect(result).toEqual({
      user: null,
      isLoading: false,
      error: null,
      isAuthChecked: false,
    });
  });

  it('должен менять значение флага isAuthChecked', () => {
    const startState = {
      user: null,
      isLoading: false,
      error: null,
      isAuthChecked: false,
    };

    const result = userReducer(startState, setIsAuthChecked(true));
    expect(result.isAuthChecked).toBe(true);
  });

  it('должен менять значение user', () => {
    const startState = {
      user: null,
      isLoading: false,
      error: null,
      isAuthChecked: false,
    };

    const result = userReducer(
      startState,
      setUser({ email: 'username@mail.ru', password: 'qwerty', name: 'username' })
    );
    expect(result.user).toEqual({
      email: 'username@mail.ru',
      password: 'qwerty',
      name: 'username',
    });
  });
});
