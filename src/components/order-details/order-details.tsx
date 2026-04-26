import donePng from '@/assets/images/done.png';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import {
  getOrderNumberSelector,
  getOrderNumberIsLoadingSelector,
} from '@services/ingredients/reducers';

import { useAppSelector } from '../../hooks';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element => {
  const orderNumber = useAppSelector(getOrderNumberSelector);
  const isLoading = useAppSelector(getOrderNumberIsLoadingSelector);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <section className={styles.order_details}>
      <p className="text text_type_digits-large mt-4 mb-8">{orderNumber}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={donePng} alt="done" />
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </section>
  );
};
