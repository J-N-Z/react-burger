import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { registerAction } from '@services/ingredients/actions/user-actions';

export const RegisterPage = (): React.JSX.Element => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (form.name && form.email && form.password) {
      dispatch(registerAction(form));
    }
  };

  return (
    <div className="form-page-wrapper">
      <section>
        <h1 className="text text_type_main-medium mb-5">Регистрация</h1>
        <form action="" className="form-page-form" onSubmit={handleSubmit}>
          <Input
            placeholder="Имя"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <EmailInput
            placeholder="E-mail"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <PasswordInput
            icon="ShowIcon"
            placeholder="Пароль"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <div>
            <Button size="medium" type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-15">
          Уже зарегистрированы? <Link to="/login">Войти</Link>
        </p>
      </section>
    </div>
  );
};
