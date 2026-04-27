import { Navigate, useLocation } from 'react-router-dom';

import {
  selectIsAuthChecked,
  selectUser,
} from '@services/ingredients/reducers/user-reducer';

import { useAppSelector } from '../../hooks';

export const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return component;
};
