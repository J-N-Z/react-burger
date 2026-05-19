import {
  SLICE_NAME,
  onOpen,
  onMessage,
  onError,
  onClose,
} from '@services/ingredients/reducers/socket-orders-user-reducer';
import { SOCKET_ORDERS_USER_URL } from '@utils/constants';

import type { Middleware, PayloadAction } from '@reduxjs/toolkit';
import type { TSocketMessage } from '@utils/types';

let ws: WebSocket | null = null;

export const socketOrdersUserMiddleware: Middleware = (store) => (next) => (action) => {
  const { type } = action as PayloadAction;

  // Здесь будет обработка экшенов
  if (type === `${SLICE_NAME}/connect`) {
    const { payload: token } = action as PayloadAction<string>;

    // Закрываем старое соединение, если есть
    if (ws) {
      ws.close();
    }

    // Создаём новый WebSocket
    ws = new WebSocket(`${SOCKET_ORDERS_USER_URL}?token=${token}`);

    // Обработчик открытия соединения
    ws.onopen = (): void => {
      store.dispatch(onOpen());
    };

    // Обработчик входящих сообщений
    ws.onmessage = (event: MessageEvent<string>): void => {
      try {
        const data: TSocketMessage = JSON.parse(event.data);
        store.dispatch(onMessage(data));
      } catch (_error) {
        store.dispatch(onError('Ошибка парсинга сообщения от сервера'));
      }
    };

    // Обработчик ошибок
    ws.onerror = (): void => {
      store.dispatch(onError('Ошибка WebSocket-соединения'));
    };

    // Обработчик закрытия соединения
    ws.onclose = (): void => {
      store.dispatch(onClose());
      ws = null;
    };
  }

  // Обработка экшена sendMessage
  if (type === `${SLICE_NAME}/sendMessage`) {
    const { payload: message } = action as PayloadAction;

    // Проверяем две вещи:
    // 1. Что ws существует (не null).
    // 2. Что соединение открыто (readyState === WebSocket.OPEN).
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  // Обработка экшена disconnect
  if (type === `${SLICE_NAME}/disconnect`) {
    if (ws) {
      ws.close();
      ws = null;
    }
  }

  return next(action);
};
