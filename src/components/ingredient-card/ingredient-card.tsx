import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';
import { useDrag } from 'react-dnd';

import { getIngredientCount } from '@services/ingredients/reducers';

import { useAppSelector } from '../../hooks';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-card.module.css';

type TIngredientCardProps = {
  ingredient: TIngredient;
};

const IngredientCard = ({ ingredient }: TIngredientCardProps): React.JSX.Element => {
  const { name, price, image } = ingredient;

  const count = useAppSelector((state) => getIngredientCount(state, ingredient));

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  return (
    <div className={styles.card} ref={dragRef}>
      <img className="mb-1" src={image} alt={name} />
      <div className={`${styles.price_container} mb-1`}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.name} text text_type_main-small`}>{name}</h3>
      {count > 0 && (
        <div className={styles.counter}>
          <Counter count={count} size="default" />
        </div>
      )}
    </div>
  );
};

export default memo(IngredientCard);
