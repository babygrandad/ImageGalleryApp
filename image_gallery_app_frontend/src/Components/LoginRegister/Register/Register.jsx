import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginRegister from '../LoginRegister.module.css';
import RegisterStyle from './Register.module.css';
import axios from 'axios';
import BASE_URL from '../../../config';
import RegisterFormInput from '../Subcomponents/RegisterFormInput'; // Corrected import
import LoginRegisterSubmitButton from '../Subcomponents/LoginRegisterSubmitButton';

const Register = () => {
  const initialState = {
    formData: {
      userName: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    formErrors: {
      userName: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    successErrors: {
      success: '',
      errors: [],
    }
  }

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState.formData);

  const [formErrors, setFormErrors] = useState(initialState.formErrors);

  const [successErrors, setSuccessErrors] = useState(initialState.successErrors);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    setFormErrors({ ...formErrors, [id]: '' })
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        return 'invalid email address.';
    } else {
        return true;
    }
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
    setSuccessErrors(initialState.successErrors);
  
    // Validate email before other validations
    const emailValidationResult = validateEmail(formData.email);
    if (emailValidationResult !== true) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: emailValidationResult, // Set the email error message
      }));
      return; // Stop submission if the email is invalid
    }
  
    // Validate the rest of the form
    const newErrors = validateForm();
  
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
    } else {
      try {
        const response = await axios.post(`${BASE_URL}/account/register`, formData);
        console.log('Registration successful', response.data);
  
        // Show alert with response message
        alert(response.data.message);
  
        // Navigate after alert confirmation
        navigate('/');
      } catch (err) {
        let errorMessage = 'An unexpected error occurred.';
  
        if (err.response) {
          console.error('Registration failed', err);
  
          // Initialize a new errors object
          const newFormErrors = { ...initialState.formErrors };
  
          const errors = err.response?.data?.errors || [`${err.response.data}`];
  
          errors.forEach((error) => {
            if (error.toLowerCase().includes('username')) {
              newFormErrors.userName = error;
            } else if (error.toLowerCase().includes('email')) {
              if (!error.includes('confirmation email')) {
                newFormErrors.email = error;
              } else {
                setSuccessErrors({
                  success: '',
                  errors: [error],
                });
              }
            } else if (error.toLowerCase().includes('password')) {
              newFormErrors.password = error;
            } else {
              setSuccessErrors({
                success: '',
                errors: [error],
              });
            }
          });
  
          // Set the form errors state
          setFormErrors(newFormErrors);
        } else if (err.request) {
          // No response was received
          console.error('No response received:', err.request);
          errorMessage = 'Cannot connect to server.';
          setSuccessErrors((prevErrors) => ({
            ...prevErrors,
            errors: [errorMessage],
          }));
        } else {
          // Something happened in setting up the request
          console.error('Error message:', err.message);
          errorMessage = err.message;
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
              <p>Showcase your unique images and explore a world of creativity.</p>
            </div>
            <div className={LoginRegister.formInputsWrapper}>
              <RegisterFormInput
                id="userName"
                label="Username"
                type="text"
                placeholder="Enter Username"
                value={formData.userName}
                error={formErrors.userName}
                onChange={handleChange}
              />
              <RegisterFormInput
                id="fullName"
                label="Full Name"
                type="text"
                placeholder="Enter Name"
                value={formData.fullName}
                error={formErrors.fullName}
                onChange={handleChange}
              />
              <RegisterFormInput
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                error={formErrors.email}
                onChange={handleChange}
              />
              <RegisterFormInput
                id="password"
                label="Password"
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                error={formErrors.password}
                onChange={handleChange}
              />
              <RegisterFormInput
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Enter Password"
                value={formData.confirmPassword}
                error={formErrors.confirmPassword}
                onChange={handleChange}
              />
              <LoginRegisterSubmitButton
                id='registerButton'
                buttonText='Register'
              />
              {successErrors.success && (
                <span className={LoginRegister.serverSuccess}>{successErrors.success}</span>
              )}
              {successErrors.errors.length > 0 && (
                <div className={LoginRegister.serverError}>
                  {successErrors.errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
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
  )
}

export default Register;
