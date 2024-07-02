import React from 'react'
import './Register.css';

const Register = () => {
  return (
    <div className='login-container'>
      <aside>
          <div className='formText'>
            <h3>Register Profile</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit?</p>
          </div>
          <div>
            <form className='loginForm' autoComplete='false'>
              <div className='formFieldContainer'>
                <lable for='fullName'>Full Name</lable>
                <input className='inputField' type='text' id='fullName' placeholder='Enter Name' />
              </div>
              <div className='formFieldContainer'>
                <lable for='emailAddress' >Email Address</lable>
                <input className='inputField' type='email' id='emailAddress' placeholder='Enter Email' />
              </div>
              <div className='formFieldContainer'>
                <lable for='emailAddress'>Password</lable>
                <input className='inputField' type='password' id='password' placeholder='Enter Password' />
              </div>
              <div className='formFieldContainer'>
                <lable for='confirmPassword'>Email Address</lable>
                <input className='inputField' type='password' id='confirmPassword' placeholder='Enter Password' />
              </div>
              <div className='formFieldContainer buttonContainer'>
                <input className='formButton button' type="button" name="register" id="register" value={"Register"} />
              </div>
              <div className='formFieldContainer alternateLogin'>
                <p>Already have an account? <a href='/login'>Login</a></p>
              </div>
            </form>
          </div>
        </aside>
        <main>

        </main>
    </div>
  )
}

export default Register