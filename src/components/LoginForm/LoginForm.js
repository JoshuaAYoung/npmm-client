import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useSignUpForm from '../Utilities/CustomHooks';
import AuthService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import { getCollections } from '../../redux/CollectionListSlice';
import './LoginForm.css';

function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const login = () => {
    AuthService.postLogin({
      email: inputs.email,
      password: inputs.password,
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
      })
      .then((res) => {
        dispatch(getCollections());
        history.push('/');
      });
  };

  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(
    { email: '', password: '' },
    login
  );

  function validateEmail(email) {
    if (!email) {
      return 'Please enter your email';
    }
    if (email > 40) {
      return 'Is that a real email?';
    }
    return false;
  }

  function validatePassword(pass) {
    if (!pass) {
      return 'Please enter your password';
    }
    if (pass > 40) {
      return 'Password cannot be longer than 40 characters';
    }
    if (pass < 6) {
      return 'Password needs to be at least 6 characters long';
    }
    return false;
  }

  return (
    <div>
      <form id="login" onSubmit={handleSubmit}>
        {validateEmail(inputs.email) && <p>{validateEmail(inputs.email)}</p>}
        <label htmlFor="email">
          Email
          <input
            required
            autoComplete="username"
            type="email"
            name="email"
            id="email"
            value={inputs.email}
            onChange={handleInputChange}
          />
        </label>
        {validatePassword(inputs.password) && (
          <p>{validatePassword(inputs.password)}</p>
        )}
        <label htmlFor="password">
          Password
          <input
            required
            autoComplete="current-password"
            type="password"
            name="password"
            id="password"
            value={inputs.password}
            onChange={handleInputChange}
          />
        </label>
        <button
          disabled={
            validateEmail(inputs.email) || validatePassword(inputs.password)
          }
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
