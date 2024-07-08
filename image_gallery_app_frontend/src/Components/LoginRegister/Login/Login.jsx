import React, { useState } from 'react';
import LoginRegister from '../LoginRegister.module.css';
import LoginStyle from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../config';
import LoginRegisterSubmitButton from '../Subcomponents/LoginRegisterSubmitButton';

function Login() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [successErrors, setSuccessErrors] = useState({
    email: '',
    response: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  };

  const validateLogin = () => {
    let isValid = true;

    if (!loginData.email) {
      setSuccessErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Email field cannot be left blank.'
      }));
      isValid = false;
    } else {
      setSuccessErrors((prevErrors) => ({
        ...prevErrors,
        email: ''
      }));
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    try {
      const response = await axios.post(`${BASE_URL}/account/login`, loginData);
      if (response.data.token) {
        navigate('/feed'); // Navigate to '/feed' upon successful login
      } else {
        setSuccessErrors((prevErrors) => ({
          ...prevErrors,
          response: response.data.message || 'Login failed.'
        }));
      }
    } catch (error) {
      setSuccessErrors((prevErrors) => ({
        ...prevErrors,
        response: error.response?.data?.message || 'Login error. Please try again.'
      }));
      console.error('Login Error: ', error);
    }
  };

  return (
    <div className={LoginStyle.LoginContainer}>
      <form className={LoginStyle.loginForm} onSubmit={handleSubmit}>
        <div className={`${LoginRegister.formText} ${LoginStyle.formText}`}>
          <h3>Image Gallery App</h3>
          <h3>Log in</h3>
        </div>
        <div className={LoginRegister.formInputsWrapper}>
          <div className={LoginRegister.formInfoContainer}>
            <label htmlFor="loginEmail" className={LoginRegister.formLable}>Email</label>
            <div className={LoginStyle.formFieldWrapper}>
              <i className="fas fa-user"></i>
              <input
                id='loginEmail'
                name='email' // Changed from 'loginEmail' to 'email' to match the state property
                type='text'
                placeholder='Enter Email'
                className={`${LoginStyle.inputField} inputField`}
                value={loginData.email}
                onChange={handleChange}
              />
            </div>
            <span id='loginEmailError' className={LoginRegister.errorText}>{successErrors.email}</span>
          </div>
          <div className={LoginRegister.formInfoContainer}>
            <label htmlFor="loginPassword" className={LoginRegister.formLable}>Password</label>
            <div className={LoginStyle.formFieldWrapper}>
              <i className="fas fa-lock"></i>
              <input
                id='loginPassword'
                name='password' // Changed from 'loginPassword' to 'password' to match the state property
                type='password'
                placeholder='Enter Password'
                className={`${LoginStyle.inputField} inputField`}
                value={loginData.password}
                onChange={handleChange}
              />
            </div>
            <div className={LoginStyle.checkContainer}>
              <a href="/forgotPassword" className={LoginStyle.forgotPassword}>Forgot Password?</a>
            </div>
          </div>
          <span className={LoginRegister.errorText}>{successErrors.response}</span>
          <LoginRegisterSubmitButton
            id='loginButton'
            buttonText='Login'
          />
          <div className={LoginRegister.formInfoContainer}>
            <p className={LoginRegister.loginRegisterQuestion}>New to this platform? <a className={LoginRegister.loginRegisterLink} href='/'>Register</a> Here</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
