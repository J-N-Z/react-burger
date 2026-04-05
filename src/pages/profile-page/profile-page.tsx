import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import {
  logoutAction,
  updateUserAction,
} from '@services/ingredients/actions/user-actions';
import { selectUser } from '@services/ingredients/reducers/user-reducer';

import styles from './profile-page.module.css';

export const ProfilePage = (): React.JSX.Element => {
  const user = useSelector(selectUser);

  const [form, setForm] = useState({ name: user.name, email: user.email, password: '' });

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = (): void => {
    setForm({ name: user.name, email: user.email, password: '' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (form.name && form.email) {
      dispatch(updateUserAction(form));
    }
  };

  const handleLogout = (): void => {
    dispatch(logoutAction());
  };

  const isFieldsChanged =
    form.name !== user.name || form.email !== user.email || form.password !== '';

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.nav}>
          <div className="mb-8">
            <Link
              to="/profile"
              className={`text text_type_main-medium ${styles.link} ${styles.link_active}`}
            >
              Профиль
            </Link>
          </div>
          <div className="mb-8">
            <Link
              to="/profile/orders"
              className={`text text_type_main-medium text_color_inactive ${styles.link}`}
            >
              История заказов
            </Link>
          </div>
          <div className="mb-8">
            <div
              className={`text text_type_main-medium text_color_inactive ${styles.link}`}
              onClick={handleLogout}
            >
              Выход
            </div>
          </div>
        </div>
        <form action="" className="form-page-form" onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Имя"
            type="text"
            value={form.name}
            onChange={handleChange}
          />
          <EmailInput
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
          />
          <PasswordInput
            icon="ShowIcon"
            name="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
          />
          {isFieldsChanged && (
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button size="medium" type="primary" htmlType="submit">
                Сохранить
              </Button>
              <Button
                size="medium"
                type="primary"
                htmlType="button"
                onClick={handleCancel}
              >
                Отмена
              </Button>
            </div>
          )}
        </form>
      </div>
      <p className="text text_type_main-default text_color_inactive mt-8">
        В этом разделе вы можете <br /> изменить свои персональные данные
      </p>

      <Outlet />
    </div>
  );
};
