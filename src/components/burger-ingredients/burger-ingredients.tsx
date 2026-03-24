import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getActiveIngredientSelector,
  setActiveIngredient,
} from '@services/ingredients/reducer';

import IngredientCard from '../ingredient-card/ingredient-card';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

type TIngredientType = 'bun' | 'main' | 'sauce';

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<TIngredientType>('bun');

  const activeIngredient = useSelector(getActiveIngredientSelector);

  const ingredientsSectionRef = useRef<HTMLElement>(null);
  const bunIngredientsTitleRef = useRef<HTMLHeadingElement>(null);
  const mainIngredientsTitleRef = useRef<HTMLHeadingElement>(null);
  const sauceIngredientsTitleRef = useRef<HTMLHeadingElement>(null);

  const handleTabClick = (
    activeTab: TIngredientType,
    element: HTMLHeadingElement | null
  ): void => {
    setActiveTab(activeTab);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const bunIngredients = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const mainIngredients = ingredients.filter((ingredient) => ingredient.type === 'main');
  const sauceIngredients = ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );

  const handleIngredientClick = useCallback(
    (ingredient: TIngredient) => dispatch(setActiveIngredient(ingredient)),
    []
  );

  const handleScroll = (): void => {
    // минимальное расстояние при котором сработает переключение табов
    const OFFSET = 300;

    if (
      ingredientsSectionRef.current &&
      bunIngredientsTitleRef.current &&
      mainIngredientsTitleRef.current &&
      sauceIngredientsTitleRef.current
    ) {
      const ingredientsSectionTop =
        ingredientsSectionRef.current.getBoundingClientRect().top;
      const bunIngredientsTitleTop =
        bunIngredientsTitleRef.current.getBoundingClientRect().top;
      const mainIngredientsTitleTop =
        mainIngredientsTitleRef.current.getBoundingClientRect().top;
      const sauceIngredientsTitleTop =
        sauceIngredientsTitleRef.current.getBoundingClientRect().top;

      const bunElementOffset = Math.abs(bunIngredientsTitleTop - ingredientsSectionTop);
      const mainElementOffset = Math.abs(
        mainIngredientsTitleTop - ingredientsSectionTop
      );
      const sauceElementOffset = Math.abs(
        sauceIngredientsTitleTop - ingredientsSectionTop
      );

      if (bunElementOffset < OFFSET && activeTab !== 'bun') {
        setActiveTab('bun');
      }
      if (mainElementOffset < OFFSET && activeTab !== 'main') {
        setActiveTab('main');
      }
      if (sauceElementOffset < OFFSET && activeTab !== 'sauce') {
        setActiveTab('sauce');
      }
    }
  };

  return (
    <section className={`${styles.burger_ingredients} pb-10`}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={activeTab === 'bun'}
            onClick={() => handleTabClick('bun', bunIngredientsTitleRef.current)}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={activeTab === 'main'}
            onClick={() => handleTabClick('main', mainIngredientsTitleRef.current)}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={activeTab === 'sauce'}
            onClick={() => handleTabClick('sauce', sauceIngredientsTitleRef.current)}
          >
            Соусы
          </Tab>
        </ul>
      </nav>

      <section
        className={`${styles.ingredients_section} custom-scroll`}
        onScroll={handleScroll}
        ref={ingredientsSectionRef}
      >
        <h2
          className={`text text_type_main-medium mt-10 mb-6`}
          ref={bunIngredientsTitleRef}
        >
          Булки
        </h2>

        <div className={`${styles.ingredients_container} pl-4 pr-4`}>
          {bunIngredients.map((ingredient) => (
            <IngredientCard
              key={ingredient._id}
              ingredient={ingredient}
              onClick={handleIngredientClick}
            />
          ))}
        </div>

        <h2
          className={`text text_type_main-medium mt-10 mb-6`}
          ref={mainIngredientsTitleRef}
        >
          Начинки
        </h2>

        <div className={`${styles.ingredients_container} pl-4 pr-4`}>
          {mainIngredients.map((ingredient) => (
            <IngredientCard
              key={ingredient._id}
              ingredient={ingredient}
              onClick={handleIngredientClick}
            />
          ))}
        </div>

        <h2
          className={`text text_type_main-medium mt-10 mb-6`}
          ref={sauceIngredientsTitleRef}
        >
          Соусы
        </h2>

        <div className={`${styles.ingredients_container} pl-4 pr-4`}>
          {sauceIngredients.map((ingredient) => (
            <IngredientCard
              key={ingredient._id}
              ingredient={ingredient}
              onClick={handleIngredientClick}
            />
          ))}
        </div>
      </section>

      {activeIngredient && (
        <Modal
          title="Детали ингредиента"
          onClose={() => dispatch(setActiveIngredient(null))}
        >
          <IngredientDetails ingredient={activeIngredient} />
        </Modal>
      )}
    </section>
  );
};
