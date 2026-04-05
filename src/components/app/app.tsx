import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { IngredientDetailsModal } from '@components/ingredient-details-modal/ingredient-details-modal';
import { ProtectedRoute } from '@components/protected-route/protected-route';
import {
  Home,
  LoginPage,
  ProfilePage,
  ProfileOrderPage,
  FeedPage,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  IngredientDetailsPage,
  NotFoundPage,
} from '@pages/index';
import { loadIngredients } from '@services/ingredients/actions';
import { checkUserAuth } from '@services/ingredients/actions/check-user-auth';
import { getIngredientsIsLoadingSelector } from '@services/ingredients/reducers';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  const isLoading = useSelector(getIngredientsIsLoadingSelector);

  useEffect(() => {
    dispatch(checkUserAuth());
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
        <Route
          path="/register"
          element={<ProtectedRoute onlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path="/login"
          element={<ProtectedRoute onlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<ProtectedRoute onlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<ProtectedRoute onlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route path="/profile" element={<ProtectedRoute component={<ProfilePage />} />}>
          <Route path="orders" element={<ProfileOrderPage />} />
        </Route>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path="ingredients/:id" element={<IngredientDetailsModal />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
