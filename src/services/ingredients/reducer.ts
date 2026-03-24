import { createSlice, nanoid } from '@reduxjs/toolkit';

import { loadIngredients, createOrder } from './actions';

import type { TIngredient, TIngredientWithId } from '@utils/types';

const initialState = {
  ingredients: [],
  isLoading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIngredientsError: (state) => state.error,
    getIngredientsIsLoadingSelector: (state) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload.data;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error?.message ?? 'Unknown error';
      });
  },
});

export default ingredientsSlice.reducer;

export const { getIngredientsSelector, getIngredientsIsLoadingSelector } =
  ingredientsSlice.selectors;

/***
 * Слайс для модального окна выбранного ингредиента в компоненте BurgerIngredients
 */

export const activeIngredientSlice = createSlice({
  name: 'activeIngredient',
  initialState: { activeIngredient: null },
  reducers: {
    setActiveIngredient: (state, action) => {
      state.activeIngredient = action.payload;
    },
  },
  selectors: {
    getActiveIngredientSelector: (state) => state.activeIngredient,
  },
});

export const { getActiveIngredientSelector } = activeIngredientSlice.selectors;

export const { setActiveIngredient } = activeIngredientSlice.actions;

/***
 * Слайс для модального окна с заказами, компонент OrderDetails
 */

const orderSliceInitialState = { orderNumber: 0, isLoading: false, error: null };

export const orderSlice = createSlice({
  name: 'order',
  initialState: orderSliceInitialState,
  reducers: {},
  selectors: {
    getOrderNumberSelector: (state) => state.orderNumber,
    getOrderNumberIsLoadingSelector: (state) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      // send and load Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.order.number) {
          state.orderNumber = action.payload?.order.number;
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error?.message ?? 'Unknown error';
      });
  },
});

export const { getOrderNumberSelector, getOrderNumberIsLoadingSelector } =
  orderSlice.selectors;

/***
 * Слайс для конструктора ингредиентов, Drag'n'Drop из BurgerIngredients в BurgerConstructor
 */

const draggableIngredientSliceInitialState: {
  bun: TIngredientWithId | null;
  ingredients: TIngredientWithId[];
} = {
  bun: null,
  ingredients: [],
};

export const draggableIngredientSlice = createSlice({
  name: 'ingredientList',
  initialState: draggableIngredientSliceInitialState,
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
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
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
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

export const { addIngredient, deleteIngredient } = draggableIngredientSlice.actions;
