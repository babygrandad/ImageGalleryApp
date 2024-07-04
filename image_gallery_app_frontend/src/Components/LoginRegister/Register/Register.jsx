import React from 'react'
import LoginRegister from '../LoginRegister.module.css'
import RegisterStyle from './Register.module.css'



const Register = () => {
  return (
    <div className={RegisterStyle.registerContainer}>
      <div className={RegisterStyle.registerWrapper}>
        <div className={RegisterStyle.aside}>
          <form className={RegisterStyle.registerForm}>
            <div className={`${LoginRegister.formText} ${RegisterStyle.formText}`}>
              <h3>Register Profile</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, quidem!</p>
            </div>
            <div className={LoginRegister.formInputsWrapper}>
            <div className={LoginRegister.formInfoContainer}>
                <label htmlFor="registerUsername" className={LoginRegister.formLable}>Username</label>
                <div className={RegisterStyle.formFieldWrapper}>
                  <input id='registerUsername' type='text' placeholder='Enter Username' className={`${RegisterStyle.inputField} inputField`} />
                </div>
                <span id='registerUsernameError' className={LoginRegister.errorText}>Userame field cannot be left empty.</span>
              </div>
              <div className={LoginRegister.formInfoContainer}>
                <label htmlFor="registerFullName" className={LoginRegister.formLable}>Full Name</label>
                <div className={RegisterStyle.formFieldWrapper}>
                  <input id='registerFullName' type='text' placeholder='Enter Name' className={`${RegisterStyle.inputField} inputField`} />
                </div>
                <span id='registerFullNameError' className={LoginRegister.errorText}>Full Name field cannot be left empty.</span>
              </div>
              <div className={LoginRegister.formInfoContainer}>
                <label htmlFor="registerEmail" className={LoginRegister.formLable}>Email Address</label>
                <div className={RegisterStyle.formFieldWrapper}>
                  <input id='registerEmail' type='email' placeholder='Enter Email' className={`${RegisterStyle.inputField} inputField`} />
                </div>
                <span id='registerEmailError' className={LoginRegister.errorText}>Email field cannot be left empty.</span>
              </div>
              <div className={LoginRegister.formInfoContainer}>
                <label htmlFor="registerPassword" className={LoginRegister.formLable}>Password</label>
                <div className={RegisterStyle.formFieldWrapper}>
                  <input id='registerPassword' type='password' placeholder='Enter Password' className={`${RegisterStyle.inputField} inputField`} />
                </div>
                <span id='registerPasswordError' className={LoginRegister.errorText}>Password field cannot be left empty.</span>
              </div>
              <div className={LoginRegister.formInfoContainer}>
                <label htmlFor="registerConfirmPassword" className={LoginRegister.formLable}>Confirm Password</label>
                <div className={RegisterStyle.formFieldWrapper}>
                  <input id='registerConfirmPassword' type='password' placeholder='Enter Password' className={`${RegisterStyle.inputField} inputField`} />
                </div>
                <span id='registerConfirmPasswordError' className={LoginRegister.errorText}>Password field cannot be left empty.</span>
              </div>
              <div className={`${LoginRegister.formInfoContainer} ${LoginRegister.buttonContainer}`}>
                <button id='LoginButton' className={`${LoginRegister.formButton} button`}>Register</button>
              </div>
              <div className={LoginRegister.formInfoContainer}>
                <p className={LoginRegister.loginRegisterQuestion}>Already have an account? <a className={LoginRegister.loginRegisterLink} href='/login'>Login</a> Here</p>
              </div>
              <div className={LoginRegister.socialButtonsWrapper}>
                <button id='RegisterToGoogleButton' className={`${LoginRegister.formButton} ${LoginRegister.socialButton} button`}><i class="fab fa-google"></i> Sign in with Google</button>
                <button id='RegisterToFacebookButton' className={`${LoginRegister.formButton} ${LoginRegister.socialButton} button`}><i class="fab fa-facebook"></i> Sign in with Facebook</button>
              </div>
            </div>
          </form>
        </div>
        <div className={RegisterStyle.main}>
          
        </div>
      </div>
    </div>
  )
}

export default Register