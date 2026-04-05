import {
  EmailInput,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginAction } from '@services/ingredients/actions/user-actions';

export const LoginPage = (): React.JSX.Element => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (form.email && form.password) {
      dispatch(loginAction(form));
    }
  };

  return (
    <div className="form-page-wrapper">
      <section>
        <h1 className="text text_type_main-medium mb-5">Вход</h1>
        <form action="" className="form-page-form" onSubmit={handleSubmit}>
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
          <div>
            <Button size="medium" type="primary" htmlType="submit">
              Войти
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-15">
          Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive mt-4">
          Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
        </p>
      </section>
    </div>
  );
};
