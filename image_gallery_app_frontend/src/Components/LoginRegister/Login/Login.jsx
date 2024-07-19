import React, { useState } from 'react';
import LoginRegister from '../LoginRegister.module.css';
import LoginStyle from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../config';
import LoginRegisterSubmitButton from '../Subcomponents/LoginRegisterSubmitButton';
import { setUser } from '../../../utils/auth';

function Login() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [successErrors, setSuccessErrors] = useState({
    email: '',
    password: '',
    response: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevValue) => ({
      ...prevValue,
      [name]: value
    }));

    setSuccessErrors((prevErrors) => ({
      ...prevErrors,
      response: '',
      email: '',
      password: ''
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
    }

    if (!loginData.password) {
      setSuccessErrors((prevErrors) => ({
        ...prevErrors,
        password: 'password field cannot be left blank.'
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    try {
      const response = await axios.post(`${BASE_URL}/account/login`, loginData);

      if (response.status === 200) {
        console.log('Success:', response.data);
        const user = response.data;
        setUser(user);
        
        try {
          navigate('/feed'); // Use navigate instead of redirect
          console.log('i ran');
        } catch (ex) {
          console.log(ex.message);
        }
      }
    }

    catch (error) {
      setLoginData((prevErrors) => ({
        ...prevErrors,
        password: ''
      }));
    
      let errorMessage = 'An unexpected error occurred.';
    
      if (error.response) {
        // Server responded with a status other than 2xx
        switch (error.response.status) {
          case 400:
            console.error('Bad Request:', error.response.data);
            errorMessage = error.response.data.message || 'Bad Request';
            break;
          case 401:
            console.error('Unauthorized:', error.response.data);
            errorMessage = error.response.data.message || 'Unauthorized';
            setSuccessErrors((prevErrors) => ({
              ...prevErrors,
              response: errorMessage
            }));
            break;
          case 500:
            console.error('Internal Server Error:', error.response.data);
            errorMessage = error.response.data.message || 'Internal Server Error';
            break;
          default:
            console.error('Unexpected error:', error.response.data);
            errorMessage = error.response.data.message || 'Unexpected error';
        }
      } else if (error.request) {
        // No response was received
        console.error('No response received:', error.request);
        errorMessage = 'Cannot connect to server.';
        setSuccessErrors((prevErrors) => ({
          ...prevErrors,
          response: errorMessage
        }));
      } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
        errorMessage = error.message;
      }
    
      // Logging the complete error object for debugging
      console.error('Full error object:', error);
    }
    
  };

  return (
    <div className={LoginStyle.LoginContainer}>
      <form className={LoginStyle.loginForm} onSubmit={handleSubmit}>
        <div className={`${LoginRegister.formText} ${LoginStyle.formText}`}>
          <h3>Image Gallery App</h3>
          <h3>Login</h3>
        </div>
        <div className={LoginRegister.formInputsWrapper}>
          <div className={LoginRegister.formInfoContainer}>
            <label htmlFor="loginEmail" className={LoginRegister.formLable}>Email</label>
            <div className={LoginStyle.formFieldWrapper}>
              <i className={`${LoginStyle.inputIcon} fas fa-user`}></i>
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
              <i className={`${LoginStyle.inputIcon} fas fa-lock`}></i>
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
            <span id='loginPasswordError' className={LoginRegister.errorText}>{successErrors.password}</span>
              <a href="/forgotPassword" className={LoginStyle.forgotPassword}>Forgot Password?</a>
            </div>
          </div>
          <span className={LoginRegister.errorText}>{successErrors.response}</span>
          <LoginRegisterSubmitButton
            id='loginButton'
            buttonText='Login'
          />
          <div className={LoginRegister.formInfoContainer}>
            <p className={LoginRegister.loginRegisterQuestion}>New to this platform? <a className={LoginRegister.loginRegisterLink} href='/register'>Register</a> Here</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
