import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { passwordResetAction } from '@services/ingredients/actions/user-actions';

export const ResetPasswordPage = (): React.JSX.Element => {
  const [form, setForm] = useState({ password: '', code: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (form.password && form.code) {
      dispatch(
        passwordResetAction({
          password: form.password,
          token: form.code,
          callback: () => navigate('/login'),
        })
      );
    }
  };

  return (
    <div className="form-page-wrapper">
      <section>
        <h1 className="text text_type_main-medium mb-5">Восстановление пароля</h1>
        <form action="" className="form-page-form" onSubmit={handleSubmit}>
          <PasswordInput
            icon="ShowIcon"
            name="password"
            placeholder="Введите новый пароль"
            value={form.password}
            onChange={handleChange}
          />
          <Input
            errorText="Ошибка"
            name="code"
            placeholder="Введите код из письма"
            size="default"
            type="text"
            value={form.code}
            onChange={handleChange}
          />
          <div>
            <Button size="medium" type="primary" htmlType="submit">
              Сохранить
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-15">
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </section>
    </div>
  );
};
