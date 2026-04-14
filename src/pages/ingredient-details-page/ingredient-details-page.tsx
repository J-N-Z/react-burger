import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { getIngredientsSelector } from '@services/ingredients/reducers/get-ingredients-reducer';

import styles from './ingredient-details-page.module.css';

export const IngredientDetailsPage = () => {
  const { id } = useParams();

  const ingredients = useSelector(getIngredientsSelector);
  const ingredient = ingredients.find((item) => item._id === id);

  if (!ingredient) return null;

  return (
    <div className={styles.container}>
      <IngredientDetails ingredient={ingredient} />
    </div>
  );
};
