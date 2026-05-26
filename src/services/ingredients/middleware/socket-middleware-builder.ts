import type {
  Middleware,
  PayloadAction,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit';
import type { TSocketMessage } from '@utils/types';

export const socketMiddlewareBuilder = ({
  sliceName,
  url,
  onOpen,
  onMessage,
  onError,
  onClose,
}: {
  sliceName: string;
  url: string;
  onOpen: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<TSocketMessage>;
  onError: ActionCreatorWithPayload<string>;
  onClose: ActionCreatorWithoutPayload;
}): Middleware => {
  let ws: WebSocket | null = null;

  return (store) => (next) => (action) => {
    {
      const { type } = action as PayloadAction;

      // Здесь будет обработка экшенов
      if (type === `${sliceName}/connect`) {
        const { payload: token } = action as PayloadAction<string>;

        // Закрываем старое соединение, если есть
        if (ws) {
          ws.close();
        }

        // Создаём новый WebSocket
        ws = new WebSocket(token ? `${url}?token=${token}` : url);

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
      if (type === `${sliceName}/sendMessage`) {
        const { payload: message } = action as PayloadAction;

        // Проверяем две вещи:
        // 1. Что ws существует (не null).
        // 2. Что соединение открыто (readyState === WebSocket.OPEN).
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(message));
        }
      }

      // Обработка экшена disconnect
      if (type === `${sliceName}/disconnect`) {
        if (ws) {
          ws.close();
          ws = null;
        }
      }

      return next(action);
    }
  };
};
