import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-card.module.css';

type TIngredientCardProps = {
  ingredient: TIngredient;
  count?: number;
  onClick?: (ingredient: TIngredient) => void;
};

const IngredientCard = ({
  ingredient,
  count = 0,
  onClick,
}: TIngredientCardProps): React.JSX.Element => {
  const { name, price, image } = ingredient;
  return (
    <div className={styles.card} onClick={() => onClick(ingredient)}>
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
