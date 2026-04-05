import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { getIngredientsSelector } from '@services/ingredients/reducers/get-ingredients-reducer';

export const IngredientDetailsPage = () => {
  const { id } = useParams();

  const ingredients = useSelector(getIngredientsSelector);
  const ingredient = ingredients.find((item) => item._id === id);

  if (!ingredient) return null;

  return <IngredientDetails ingredient={ingredient} />;
};
