import {
  SLICE_NAME,
  onOpen,
  onMessage,
  onError,
  onClose,
} from '@/services/ingredients/reducers/socket-orders-all-reducer/socket-orders-all-reducer';

import { SOCKET_ORDERS_ALL_URL } from '@utils/constants';

import { socketMiddlewareBuilder } from './socket-middleware-builder';

export const socketOrdersAllMiddleware = socketMiddlewareBuilder({
  sliceName: SLICE_NAME,
  url: SOCKET_ORDERS_ALL_URL,
  onOpen,
  onMessage,
  onError,
  onClose,
});
