import { EmailInput, Button } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { passwordResetCheckEmailAction } from '@services/ingredients/actions/user-actions';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (email) {
      dispatch(
        passwordResetCheckEmailAction({
          email,
          callback: () => {
            localStorage.setItem('forgotPasswordPageVisited', 'true');
            navigate('/reset-password');
          },
        })
      );
    }
  };

  return (
    <div className="form-page-wrapper">
      <section>
        <h1 className="text text_type_main-medium mb-5">Восстановление пароля</h1>
        <form action="" className="form-page-form" onSubmit={handleSubmit}>
          <EmailInput
            name="email"
            placeholder="Укажите e-mail"
            value={email}
            onChange={handleChange}
          />
          <div>
            <Button size="medium" type="primary" htmlType="submit">
              Восстановить
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
