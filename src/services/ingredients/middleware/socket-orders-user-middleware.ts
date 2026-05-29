import {
  SLICE_NAME,
  onOpen,
  onMessage,
  onError,
  onClose,
} from '@/services/ingredients/reducers/socket-orders-user-reducer/socket-orders-user-reducer';

import { SOCKET_ORDERS_USER_URL } from '@utils/constants';

import { socketMiddlewareBuilder } from './socket-middleware-builder';

export const socketOrdersUserMiddleware = socketMiddlewareBuilder({
  sliceName: SLICE_NAME,
  url: SOCKET_ORDERS_USER_URL,
  onOpen,
  onMessage,
  onError,
  onClose,
});
