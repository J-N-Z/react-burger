import { describe, it, expect } from 'vitest';

import draggableIngredientReducer, {
  addIngredient,
  deleteIngredient,
  sortIngredients,
  initialState,
} from './draggable-ingredient-reducer';

const INGREDIENT_MINERAL_RINGS = {
  _id: '692889f16bf770001bfeb4d6',
  name: 'Хрустящие минеральные кольца',
  type: 'main',
  proteins: 808,
  fat: 689,
  carbohydrates: 609,
  calories: 986,
  price: 300,
  image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
  __v: 0,
};

describe('draggableIngredientSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = draggableIngredientReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('должен добавить ингредиент-начинку при addIngredient', () => {
    const result = draggableIngredientReducer(
      initialState,
      addIngredient(INGREDIENT_MINERAL_RINGS)
    );
    expect(result.ingredients).toHaveLength(1);
  });

  it('должен добавить ингредиент-булку при addIngredient', () => {
    const result = draggableIngredientReducer(
      initialState,
      addIngredient({
        _id: '692889f16bf770001bfeb4cc',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
      })
    );
    expect(result.bun).not.toBeNull();
  });

  it('должен удалить ингредиент при deleteIngredient', () => {
    const startState = {
      ...initialState,
      ingredients: [
        {
          id: '1',
          ...INGREDIENT_MINERAL_RINGS,
        },
      ],
    };

    const result = draggableIngredientReducer(startState, deleteIngredient('1'));
    expect(result.ingredients).toEqual([]);
  });

  it('должен переместить ингредиент на новую позицию при sortIngredients', () => {
    const startState = {
      ...initialState,
      ingredients: [
        {
          id: '1',
          ...INGREDIENT_MINERAL_RINGS,
        },
        {
          id: '2',
          _id: '692889f16bf770001bfeb4d7',
          name: 'Плоды Фалленианского дерева',
          type: 'main',
          proteins: 20,
          fat: 5,
          carbohydrates: 55,
          calories: 77,
          price: 874,
          image: 'https://code.s3.yandex.net/react/code/sp_1.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
          __v: 0,
        },
      ],
    };

    const result = draggableIngredientReducer(
      startState,
      sortIngredients({ dragIndex: 0, hoverIndex: 1 })
    );
    expect(result.ingredients[0].id).toEqual('2');
  });
});
