import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  const innerIngredients = ingredients.filter((ingredient) => ingredient.type !== 'bun');
  const bunIngredients = ingredients.filter((ingredient) => ingredient.type === 'bun');

  // TODO Доработать логику подстановки булок, когда будет ТЗ
  const bunIngredientMock = bunIngredients[0];

  return (
    <section className={`${styles.burger_constructor}`}>
      <div className="pl-4 pr-4">
        {bunIngredientMock && (
          <div className={`${styles.element_wrapper} mb-4 pl-7`}>
            <ConstructorElement
              text={`${bunIngredientMock.name} (верх)`}
              price={bunIngredientMock.price}
              thumbnail={bunIngredientMock.image}
              type="top"
              isLocked={true}
            />
          </div>
        )}

        <div className={`${styles.scroll_container} custom-scroll pr-1`}>
          {innerIngredients.map((ingredient) => (
            <div key={ingredient._id} className={`${styles.element_wrapper} mb-4`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </div>
          ))}
        </div>

        {bunIngredientMock && (
          <div className={`${styles.element_wrapper} mt-4 mb-4 pl-7`}>
            <ConstructorElement
              text={`${bunIngredientMock.name} (низ)`}
              price={bunIngredientMock.price}
              thumbnail={bunIngredientMock.image}
              type="bottom"
              isLocked={true}
            />
          </div>
        )}
      </div>
      <div className={`${styles.footer} pt-10 pb-8 pl-4 pr-4`}>
        <div className={`${styles.price_container} mb-1`}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon className={`${styles.price_icon}`} type="primary" />
        </div>
        <Button
          onClick={() => setShowModal(true)}
          size="large"
          type="primary"
          htmlType="button"
        >
          Оформить заказ
        </Button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
