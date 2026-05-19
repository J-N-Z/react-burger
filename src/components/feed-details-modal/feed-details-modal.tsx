import { useNavigate, useParams } from 'react-router-dom';

import { FeedDetails } from '@components/feed-details/feed-details';
import { getIngredientsSelector } from '@services/ingredients/reducers/get-ingredients-reducer';
import { selectOrders } from '@services/ingredients/reducers/socket-orders-all-reducer';

import { useAppSelector } from '../../hooks';
import { Modal } from '../modal/modal';

import type { TIngredient } from '@utils/types';

export const FeedDetailsModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const orders = useAppSelector(selectOrders);
  const ingredients = useAppSelector(getIngredientsSelector);

  const order = orders.find((item) => item._id === id);

  const orderIngredients: TIngredient[] = [];

  order?.ingredients.forEach((ingredientId) => {
    const orderIngredient = ingredients.find((item) => item._id === ingredientId);
    if (orderIngredient) {
      orderIngredients.push(orderIngredient);
    }
  });

  const onClose = (): void => {
    navigate(-1);
  };

  if (!order) return null;

  return (
    <Modal
      title={<h3 className="text text_type_digits-default">#{order.number}</h3>}
      onClose={onClose}
    >
      <FeedDetails
        name={order.name}
        status={order.status}
        createdDate={order.createdAt}
        ingredients={orderIngredients}
      />
    </Modal>
  );
};
