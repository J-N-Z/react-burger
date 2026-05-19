import { useAppDispatch, useAppSelector } from '@/hooks';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { OrderItem } from '@components/order-item/order-item';
import { getIngredientsSelector } from '@services/ingredients/reducers/get-ingredients-reducer';
import {
  selectOrders,
  connect,
} from '@services/ingredients/reducers/socket-orders-user-reducer';

import styles from './profile-order-page.module.css';

export const ProfileOrderPage = (): React.JSX.Element => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const ingredients = useAppSelector(getIngredientsSelector);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')?.replace('Bearer ', '');
    dispatch(connect(accessToken));
  }, []);

  return (
    <div className={styles.container}>
      {orders?.map((order) => {
        let orderPrice = 0;
        const previewImages: string[] = [];

        order.ingredients.forEach((ingredientId: string) => {
          const ingredient = ingredients.find(
            (ingredient) => ingredient._id === ingredientId
          );
          const ingredientPrice = ingredient?.price ?? 0;
          const ingredientPreviewImage = ingredient?.image;

          orderPrice += ingredientPrice;
          ingredientPreviewImage && previewImages.push(ingredientPreviewImage);
        });

        return (
          <Link
            key={order._id}
            to={`/profile/orders/${order._id}`}
            state={{ backgroundLocation: location }}
            className={`${styles.link} mb-6`}
          >
            <OrderItem
              name={order.name}
              number={order.number}
              status={order.status}
              price={orderPrice}
              previewImages={previewImages}
              createdDate={order.createdAt}
            />
          </Link>
        );
      })}
    </div>
  );
};
