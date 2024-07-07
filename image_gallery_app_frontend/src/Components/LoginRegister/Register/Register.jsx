import React, { useState } from 'react';
import LoginRegister from '../LoginRegister.module.css';
import RegisterStyle from './Register.module.css';
import axios from 'axios';
import BASE_URL from '../../../config';

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
        console.error('Error registering', error);
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
              <div className={LoginRegister.formInfoContainer}>
                <label htmlFor="userName" className={LoginRegister.formLable}>Username</label>
                <div className={RegisterStyle.formFieldWrapper}>
                  <input
                    id='userName'
                    type='text'
                    placeholder='Enter Username'
                    className={`${RegisterStyle.inputField} inputField`}
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>
                <span id='registerUsernameError' className={LoginRegister.errorText}>{errors.userName}</span>
              </div>
              <div className={LoginRegister.formInfoContainer}>
                <label htmlFor="fullName" className={LoginRegister.formLable}>Full Name</label>
                <div className={RegisterStyle.formFieldWrapper}>
                  <input
                    id='fullName'
                    type='text'
                    placeholder='Enter Name'
                    className={`${RegisterStyle.inputField} inputField`}
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <span id='registerFullNameError' className={LoginRegister.errorText}>{errors.fullName}</span>
              </div>
              <div className={LoginRegister.formInfoContainer}>
                <label htmlFor="email" className={LoginRegister.formLable}>Email Address</label>
                <div className={RegisterStyle.formFieldWrapper}>
                  <input
                    id='email'
                    type='email'
                    placeholder='Enter Email'
                    className={`${RegisterStyle.inputField} inputField`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <span id='registerEmailError' className={LoginRegister.errorText}>{errors.email}</span>
              </div>
              <div className={LoginRegister.formInfoContainer}>
                <label htmlFor="password" className={LoginRegister.formLable}>Password</label>
                <div className={RegisterStyle.formFieldWrapper}>
                  <input
                    id='password'
                    type='password'
                    placeholder='Enter Password'
                    className={`${RegisterStyle.inputField} inputField`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <span id='registerPasswordError' className={LoginRegister.errorText}>{errors.password}</span>
              </div>
              <div className={LoginRegister.formInfoContainer}>
                <label htmlFor="confirmPassword" className={LoginRegister.formLable}>Confirm Password</label>
                <div className={RegisterStyle.formFieldWrapper}>
                  <input
                    id='confirmPassword'
                    type='password'
                    placeholder='Enter Password'
                    className={`${RegisterStyle.inputField} inputField`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <span id='registerConfirmPasswordError' className={LoginRegister.errorText}>{errors.confirmPassword}</span>
              </div>
              <div className={`${LoginRegister.formInfoContainer} ${LoginRegister.buttonContainer}`}>
                <button id='LoginButton' className={`${LoginRegister.formButton} button`} type="submit">Register</button>
              </div>
              <div className={LoginRegister.formInfoContainer}>
                <p className={LoginRegister.loginRegisterQuestion}>
                  Already have an account? <a className={LoginRegister.loginRegisterLink} href='/login'>Login</a> Here
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
