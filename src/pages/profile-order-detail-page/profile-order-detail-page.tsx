import { useAppDispatch, useAppSelector } from '@/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FeedDetails } from '@components/feed-details/feed-details';
import { getIngredientsSelector } from '@services/ingredients/reducers/get-ingredients-reducer';
import {
  selectOrders,
  connect,
  disconnect,
} from '@services/ingredients/reducers/socket-orders-user-reducer';

import type { TIngredient } from '@utils/types';

import styles from './profile-order-detail-page.module.css';

export const ProfileOrderDetailPage = (): React.JSX.Element | null => {
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
    const accessToken = localStorage.getItem('accessToken')?.replace('Bearer ', '');
    dispatch(connect(accessToken));

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
