import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { sortIngredients } from '@services/ingredients/reducers';

import { useAppDispatch } from '../../hooks';

import type { TIngredient } from '@utils/types';

import styles from './draggabale-constructor-element.module.css';

export const DraggableConstructorElement = ({
  index,
  ingredient,
  onDelete,
}: {
  index: number;
  ingredient: TIngredient;
  onDelete: () => void;
}): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const ref = useRef(null);

  const [, drag] = useDrag({
    type: 'constructorItem',
    item: { ingredient, index },
  });

  const [, drop] = useDrop({
    accept: 'constructorItem',
    hover(item) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch(
        sortIngredients({
          dragIndex,
          hoverIndex,
        })
      );

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div className={`${styles.element_wrapper} mb-4`} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onDelete()}
      />
    </div>
  );
};
