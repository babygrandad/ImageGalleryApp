import React from 'react'
import './Login.css';

function Login() {
  return (
	<div className='login-container'>
      <aside>
          <div className='formText'>
            <h3>Login</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit?</p>
          </div>
          <div>
            <form className='loginForm' autoComplete='false'>
              <div className='formFieldContainer'>
                <lable for='emailAddress' >Email Address</lable>
                <input className='inputField' type='email' id='emailAddress' placeholder='Enter Email' />
              </div>
              <div className='formFieldContainer'>
                <lable for='emailAddress'>Password</lable>
                <input className='inputField' type='password' id='password' placeholder='Enter Password' />
              </div>
              <div className='formFieldContainer buttonContainer'>
                <input className='formButton button' type="button" name="register" id="register" value={"Login"} />
              </div>
              <div className='formFieldContainer alternateLogin'>
                <p>Don't have an account? <a href='/'>Register</a></p>
              </div>
            </form>
          </div>
        </aside>
        <main>

        </main>
    </div>
  )
}

export default Login