import React, { useState } from 'react';
import LoginRegister from '../LoginRegister.module.css';
import RegisterStyle from './Register.module.css';
import axios from 'axios';
import BASE_URL from '../../../config';
import RegisterFormInput from '../Subcomponents/RegisterFormInput'; // Corrected import
import LoginRegisterSubmitButton from '../Subcomponents/LoginRegisterSubmitButton';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    userName: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName) newErrors.userName = 'Username field cannot be left empty.';
    if (!formData.fullName) newErrors.fullName = 'Full Name field cannot be left empty.';
    if (!formData.email) newErrors.email = 'Email field cannot be left empty.';
    if (!formData.password) newErrors.password = 'Password field cannot be left empty.';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    } else if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password field cannot be left empty.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await axios.post(`${BASE_URL}/account/register`, formData);
        console.log('Registration successful', response.data);
      } catch (error) {
        const serverErrors = {}
        if(error.response.data.errors){
        var responseErrors = error.response.data.errors
        console.log(responseErrors)

        responseErrors.forEach(err => {
            err.includes('Username') ? serverErrors.userName = err : serverErrors.userName = "";
            err.includes('Email') ? serverErrors.email = err : serverErrors.email = "";
            err.includes('Passwords') ? serverErrors.password = err : serverErrors.password = "";
        });

        setErrors(serverErrors)

        }
      }
    }
  };

  return (
    <div className={RegisterStyle.registerContainer}>
      <div className={RegisterStyle.registerWrapper}>
        <div className={RegisterStyle.aside}>
          <form className={RegisterStyle.registerForm} onSubmit={handleSubmit}>
            <div className={`${LoginRegister.formText} ${RegisterStyle.formText}`}>
              <h3>Register Profile</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, quidem!</p>
            </div>
            <div className={LoginRegister.formInputsWrapper}>
              <RegisterFormInput
                id="userName"
                label="Username"
                type="text"
                placeholder="Enter Username"
                value={formData.userName}
                error={errors.userName}
                onChange={handleChange}
              />
              <RegisterFormInput
                id="fullName"
                label="Full Name"
                type="text"
                placeholder="Enter Name"
                value={formData.fullName}
                error={errors.fullName}
                onChange={handleChange}
              />
              <RegisterFormInput
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                error={errors.email}
                onChange={handleChange}
              />
              <RegisterFormInput
                id="password"
                label="Password"
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                error={errors.password}
                onChange={handleChange}
              />
              <RegisterFormInput
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Enter Password"
                value={formData.confirmPassword}
                error={errors.confirmPassword}
                onChange={handleChange}
              />
              <LoginRegisterSubmitButton
                id='registerButton'
                buttonText='Register'
              />
              <div className={LoginRegister.formInfoContainer}>
                <p className={LoginRegister.loginRegisterQuestion}>
                  Already have an account? <a className={LoginRegister.loginRegisterLink} href='/'>Login</a> Here
                </p>
              </div>
              <div className={LoginRegister.socialButtonsWrapper}>
                <button id='RegisterToGoogleButton' className={`${LoginRegister.formButton} ${LoginRegister.socialButton} button`}>
                  <i className="fab fa-google"></i> Sign in with Google
                </button>
                <button id='RegisterToFacebookButton' className={`${LoginRegister.formButton} ${LoginRegister.socialButton} button`}>
                  <i className="fab fa-facebook"></i> Sign in with Facebook
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={RegisterStyle.main}></div>
      </div>
    </div>
  );
};

export default Register;
