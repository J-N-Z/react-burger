import type { TIngredient } from '@utils/types';

import styles from './ingredient-details.module.css';

export const IngredientDetails = ({
  ingredient: { name, calories, proteins, fat, carbohydrates, image_large },
}: {
  ingredient: TIngredient;
}): React.JSX.Element => {
  return (
    <section className={styles.ingredient_details}>
      <img src={image_large} alt={name} />
      <p className="text text_type_main-medium mt-4 mb-8">{name}</p>
      <div className={styles.details}>
        <div className={styles.details_item}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">{calories}</p>
        </div>
        <div className={styles.details_item}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
        </div>
        <div className={styles.details_item}>
          <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{fat}</p>
        </div>
        <div className={styles.details_item}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </p>
        </div>
      </div>
    </section>
  );
};
