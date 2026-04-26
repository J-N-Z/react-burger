import { createSlice, nanoid } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient, TIngredientWithId } from '@utils/types';

/***
 * Слайс для конструктора ингредиентов, Drag'n'Drop из BurgerIngredients в BurgerConstructor
 */

type TDraggableIngredientState = {
  bun: TIngredientWithId | null;
  ingredients: TIngredientWithId[];
};

const initialState: TDraggableIngredientState = {
  bun: null,
  ingredients: [],
};

export const draggableIngredientSlice = createSlice({
  name: 'ingredientList',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TIngredientWithId>) => {
        const newIngredient = action.payload;
        if (newIngredient.type === 'bun') {
          state.bun = newIngredient;
        } else {
          state.ingredients.push(newIngredient);
        }
      },
      prepare: (ingredient: TIngredient) => {
        return { payload: { ...ingredient, id: nanoid() } };
      },
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    sortIngredients: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const element = state.ingredients.splice(dragIndex, 1)[0];
      state.ingredients.splice(hoverIndex, 0, element);
    },
  },
  selectors: {
    getBunSelector: (state) => state.bun,
    getFillingIngredientsSelector: (state) => state.ingredients,
    getTotalPriceSelector: (state) => {
      let fillingIngredientsPrice = 0;
      state.ingredients.forEach((ingredient) => {
        fillingIngredientsPrice += ingredient.price;
      });
      const bunPrice = state.bun?.price ?? 0;
      return fillingIngredientsPrice + bunPrice;
    },
    getIngredientCount: (state, ingredient: TIngredientWithId) => {
      if (state.bun?._id === ingredient._id) {
        // при добавлении булки в конструктор их количество - 2
        return 2;
      }
      const filteredIngredients = state.ingredients.filter(
        (_ingredient) => _ingredient._id === ingredient._id
      );
      return filteredIngredients.length;
    },
  },
});

export const {
  getBunSelector,
  getFillingIngredientsSelector,
  getTotalPriceSelector,
  getIngredientCount,
} = draggableIngredientSlice.selectors;

export const { addIngredient, deleteIngredient, sortIngredients } =
  draggableIngredientSlice.actions;
