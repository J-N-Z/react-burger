import { useAppDispatch, useAppSelector } from '@/hooks';
import { getIngredientsSelector } from '@/services/ingredients/reducers/get-ingredients-reducer/get-ingredients-reducer';
import {
  selectOrders,
  connect,
  disconnect,
} from '@/services/ingredients/reducers/socket-orders-all-reducer/socket-orders-all-reducer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FeedDetails } from '@components/feed-details/feed-details';

import type { TIngredient } from '@utils/types';

import styles from './feed-detail-page.module.css';

export const FeedDetailPage = (): React.JSX.Element | null => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const ingredients = useAppSelector(getIngredientsSelector);

  const order = orders?.find((item) => item._id === id);

  const orderIngredients: TIngredient[] = [];

  order?.ingredients.forEach((ingredientId) => {
    const orderIngredient = ingredients.find((item) => item._id === ingredientId);
    if (orderIngredient) {
      orderIngredients.push(orderIngredient);
    }
  });

  useEffect(() => {
    dispatch(connect());

    return () => {
      dispatch(disconnect());
    };
  }, []);

  if (!order) return null;

  return (
    <div className={styles.container}>
      <FeedDetails
        name={order.name}
        number={order.number}
        status={order.status}
        createdDate={order.createdAt}
        ingredients={orderIngredients}
      />
    </div>
  );
};
