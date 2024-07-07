import React, { useState } from 'react';
import LoginRegister from '../LoginRegister.module.css';
import LoginStyle from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../config';

function Login() {

  const navigate = useNavigate(); // Hook to navigate programmatically

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevValue => {
      console.log(`email: ${prevValue.email}`);
      return {
        ...prevValue, [name]: value
      }
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/account/login`, loginData);
      if (response.data.token) {
        navigate('/feed'); // Navigate to '/feed' upon successful login
      }
      
    } catch (error) {
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
                name='email' // Changed from 'loginEmail' to 'email' to match the state property
                type='text'
                placeholder='Enter Email'
                className={`${LoginStyle.inputField} inputField`}
                value={loginData.email}
                onChange={handleChange}
              />
            </div>
            <span id='loginEmailError' className={LoginRegister.errorText}>Email field cannot be left empty.</span>
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
            <span id='loginPasswordError' className={LoginRegister.errorText}>.-.</span>
            <div className={LoginStyle.checkContainer}>
              <div>
                <input type='checkbox' /> <span className={LoginStyle.rememberText}>Remember me?</span>
              </div>
              <a href="/forgotPassword" className={LoginStyle.forgotPassword}>Forgot Password?</a>
            </div>
          </div>
          <div className={`${LoginRegister.formInfoContainer} ${LoginRegister.buttonContainer}`}>
            <button id='LoginButton' className={`${LoginRegister.formButton} button`}>Login</button>
          </div>
          <div className={LoginRegister.formInfoContainer}>
            <p className={LoginRegister.loginRegisterQuestion}>New to this platform? <a className={LoginRegister.loginRegisterLink} href='/'>Register</a> Here</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
