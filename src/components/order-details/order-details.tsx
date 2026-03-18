import donePng from '@/assets/images/done.png';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element => {
  return (
    <section className={styles.order_details}>
      <p className="text text_type_digits-large mt-4 mb-8">034536</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={donePng} alt="done" />
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </section>
  );
};
