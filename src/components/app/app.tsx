import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { loadIngredients } from '@services/ingredients/actions';
import { getIngredientsIsLoadingSelector } from '@services/ingredients/reducers';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getIngredientsIsLoadingSelector);

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  if (isLoading) {
    return (
      <div className={styles.preloader_container}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <DndProvider backend={HTML5Backend}>
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
};

export default App;
