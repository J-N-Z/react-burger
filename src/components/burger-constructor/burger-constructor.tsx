import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { createOrder } from '@services/ingredients/actions';
import {
  addIngredient,
  deleteIngredient,
  getBunSelector,
  getFillingIngredientsSelector,
  getTotalPriceSelector,
} from '@services/ingredients/reducers';

import { DraggableConstructorElement } from '../draggabale-constructor-element/draggabale-constructor-element';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const bun = useSelector(getBunSelector);
  const fillingIngredients = useSelector(getFillingIngredientsSelector);
  const totalPrice = useSelector(getTotalPriceSelector);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
  });

  return (
    <section className={`${styles.burger_constructor}`}>
      <div className="pl-4 pr-4" ref={dropTarget}>
        {bun ? (
          <div className={`${styles.element_wrapper} mb-4 pl-7`}>
            <ConstructorElement
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              type="top"
              isLocked={true}
            />
          </div>
        ) : (
          <div className={`${styles.burger_constructor_dummy} mb-4 pl-7`}>
            <div className="constructor-element constructor-element_pos_top">
              Выберите булки
            </div>
          </div>
        )}

        <div className={`${styles.scroll_container} custom-scroll pr-1`}>
          {fillingIngredients.length ? (
            <>
              {fillingIngredients.map((ingredient, index) => (
                <DraggableConstructorElement
                  key={ingredient.id}
                  index={index}
                  ingredient={ingredient}
                  onDelete={() => dispatch(deleteIngredient(ingredient.id))}
                />
              ))}
            </>
          ) : (
            <div className={`${styles.burger_constructor_dummy} mb-4 pl-7`}>
              <div className="constructor-element">Выберите начинку</div>
            </div>
          )}
        </div>

        {bun ? (
          <div className={`${styles.element_wrapper} mb-4 pl-7`}>
            <ConstructorElement
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              type="bottom"
              isLocked={true}
            />
          </div>
        ) : (
          <div className={`${styles.burger_constructor_dummy} mb-4 pl-7`}>
            <div className="constructor-element constructor-element_pos_bottom">
              Выберите булки
            </div>
          </div>
        )}
      </div>

      <div className={`${styles.footer} pt-10 pb-8 pl-4 pr-4`}>
        <div className={`${styles.price_container} mb-1`}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon className={`${styles.price_icon}`} type="primary" />
        </div>
        <Button
          onClick={() => {
            if (bun && fillingIngredients.length) {
              const orderIngredientsIds = [
                bun._id,
                ...fillingIngredients.map((ingredient) => ingredient._id),
                bun._id,
              ];
              setShowModal(true);
              dispatch(createOrder(orderIngredientsIds));
            }
          }}
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
