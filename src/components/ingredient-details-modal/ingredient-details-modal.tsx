import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getIngredientsSelector } from '@services/ingredients/reducers/get-ingredients-reducer';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

export const IngredientDetailsModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const ingredients = useSelector(getIngredientsSelector);
  const ingredient = ingredients.find((item) => item._id === id);

  const onClose = (): void => {
    navigate(-1);
  };

  if (!ingredient) return null;

  return (
    <Modal title="Детали ингредиента" onClose={onClose}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  );
};
