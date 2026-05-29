import { describe, it, expect } from 'vitest';

import socketOrdersAllReducer, {
  connect,
  disconnect,
  onOpen,
  onMessage,
  onError,
  onClose,
  initialState,
} from './socket-orders-all-reducer';

describe('socketOrdersAllSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = socketOrdersAllReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('должен менять значения isLoading, error при connect', () => {
    const startState = {
      isConnected: false,
      messages: [],
      error: 'error message',
      isLoading: false,
    };

    const result = socketOrdersAllReducer(startState, connect());

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

    const result = socketOrdersAllReducer(startState, disconnect());

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

    const result = socketOrdersAllReducer(startState, onOpen());

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

    const result = socketOrdersAllReducer(startState, onClose());

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

    const result = socketOrdersAllReducer(startState, onError('error message'));

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

    const result = socketOrdersAllReducer(
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
