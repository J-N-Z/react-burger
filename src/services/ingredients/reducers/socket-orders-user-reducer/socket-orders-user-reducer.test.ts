import { describe, it, expect } from 'vitest';

import socketOrdersUserReducer, {
  connect,
  disconnect,
  onOpen,
  onMessage,
  onError,
  onClose,
  initialState,
} from './socket-orders-user-reducer';

describe('socketOrdersUserSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = socketOrdersUserReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('должен менять значения isLoading, error при connect', () => {
    const startState = {
      isConnected: false,
      messages: [],
      error: 'error message',
      isLoading: false,
    };

    const result = socketOrdersUserReducer(startState, connect());

    expect(result.isLoading).toBe(true);
    expect(result.error).toBe(null);
  });

  it('должен менять значения isConnected, isLoading, messages при disconnect', () => {
    const startState = {
      isConnected: true,
      messages: [
        {
          orders: [],
          success: true,
          total: 1,
          totalToday: 1,
        },
      ],
      error: null,
      isLoading: true,
    };

    const result = socketOrdersUserReducer(startState, disconnect());

    expect(result.isLoading).toBe(false);
    expect(result.isConnected).toBe(false);
    expect(result.messages).toEqual([]);
  });

  it('должен менять значения isLoading, isConnected, error при onOpen', () => {
    const startState = {
      isConnected: false,
      messages: [],
      error: 'error message',
      isLoading: true,
    };

    const result = socketOrdersUserReducer(startState, onOpen());

    expect(result.isLoading).toBe(false);
    expect(result.isConnected).toBe(true);
    expect(result.error).toBe(null);
  });

  it('должен менять значения isLoading, isConnected при onClose', () => {
    const startState = {
      isConnected: true,
      messages: [],
      error: null,
      isLoading: true,
    };

    const result = socketOrdersUserReducer(startState, onClose());

    expect(result.isLoading).toBe(false);
    expect(result.isConnected).toBe(false);
  });

  it('должен менять значения error, isLoading при onError', () => {
    const startState = {
      isConnected: true,
      messages: [],
      error: null,
      isLoading: true,
    };

    const result = socketOrdersUserReducer(startState, onError('error message'));

    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('error message');
  });

  it('должен добавлять объект в messages при onMessage', () => {
    const startState = {
      isConnected: false,
      messages: [],
      error: null,
      isLoading: false,
    };

    const result = socketOrdersUserReducer(
      startState,
      onMessage({
        orders: [],
        success: true,
        total: 1,
        totalToday: 1,
      })
    );

    expect(result.messages).toEqual([
      {
        orders: [],
        success: true,
        total: 1,
        totalToday: 1,
      },
    ]);
  });
});
