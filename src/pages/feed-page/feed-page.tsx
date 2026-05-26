import { OrderItem } from '@/components/order-item/order-item';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getIngredientsSelector } from '@services/ingredients/reducers/get-ingredients-reducer';
import {
  selectOrders,
  selectTotal,
  selectTotalToday,
  connect,
  disconnect,
} from '@services/ingredients/reducers/socket-orders-all-reducer';

import styles from './feed-page.module.css';

export const FeedPage = (): React.JSX.Element => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const total = useAppSelector(selectTotal);
  const totalToday = useAppSelector(selectTotalToday);
  const ingredients = useAppSelector(getIngredientsSelector);

  useEffect(() => {
    dispatch(connect());

    return () => {
      dispatch(disconnect());
    };
  }, []);

  const ordersDone =
    orders?.filter((order) => order.status === 'done')?.slice(0, 20) ?? [];

  const ordersPending =
    orders?.filter((order) => order.status === 'pending')?.slice(0, 20) ?? [];

  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large mb-5`}>Лента заказов</h1>
      <main className={styles.container}>
        <div className={styles.column} style={{ overflowY: 'auto' }}>
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
                to={`/feed/${order._id}`}
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
        <div className={styles.column}>
          <div className={`${styles.orders} mb-15`}>
            <div className={styles.status_columns_container}>
              <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
              <div className={styles.status_columns}>
                <div>
                  {ordersDone.slice(0, 9).map((order) => (
                    <p
                      key={order._id}
                      className={`text text_type_digits-default mb-2 ${styles.color_done}`}
                    >
                      {order.number}
                    </p>
                  ))}
                </div>
                <div>
                  {ordersDone.slice(10, 19).map((order) => (
                    <p
                      key={order._id}
                      className={`text text_type_digits-default mb-2 ${styles.color_done}`}
                    >
                      {order.number}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.status_columns_container}>
              <h3 className="text text_type_main-medium mb-6">В работе:</h3>
              <div className={styles.status_columns}>
                <div>
                  {ordersPending.slice(0, 9).map((order) => (
                    <p key={order._id} className="text text_type_digits-default mb-2">
                      {order.number}
                    </p>
                  ))}
                </div>
                <div>
                  {ordersPending.slice(10, 19).map((order) => (
                    <p key={order._id} className="text text_type_digits-default mb-2">
                      {order.number}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-15">
            <h3 className="text text_type_main-medium mb-6">Выполнено за все время:</h3>
            <p className="text text_type_digits-large">{total}</p>
          </div>

          <div>
            <h3 className="text text_type_main-medium mb-6">Выполнено за сегодня:</h3>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </div>
      </main>
    </>
  );
};
