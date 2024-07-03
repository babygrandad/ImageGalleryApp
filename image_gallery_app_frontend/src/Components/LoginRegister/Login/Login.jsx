import React from 'react'
import LoginRegister from '../LoginRegister.module.css'
import LoginStyle from './Login.module.css'

function Login() {
  return (
    <div className={LoginStyle.LoginContainer}>
      <form className={LoginStyle.loginForm}>
        <div className={`${LoginRegister.formText} ${LoginStyle.formText}`}>
          <h3>Image Gallery App</h3>
          <h3>Log in</h3>
        </div>
        <div className={LoginRegister.formInputsWrapper}>
          <div className={LoginRegister.formInfoContainer}>
            <label htmlFor="loginEmail" className={LoginRegister.formLable}>Email</label>
            <div className={LoginStyle.formFieldWrapper}>
              <i class="fas fa-user"></i>
              <input id='loginEmail' type='text' placeholder='Enter Email'  className={`${LoginStyle.inputField} inputField`} />
            </div>
            <span id='loginEmailError' className={LoginRegister.errorText}>Email field cannot be left empty.</span>
          </div>
          <div className={LoginRegister.formInfoContainer}>
            <label htmlFor="loginPassword" className={LoginRegister.formLable}>Password</label>
            <div className={LoginStyle.formFieldWrapper}>
              <i class="fas fa-lock"></i>
              <input id='loginPassword' type='password' placeholder='Enter Password' className={`${LoginStyle.inputField} inputField`} />
            </div>
            <span id='loginPasswordError' className={LoginRegister.errorText}>.-.</span>
            <div className={LoginStyle.checkContainer}>
              <div>
              <input type='checkbox'/> <span className={LoginStyle.rememberText}>Remember me?</span>
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
  )
}

export default Login