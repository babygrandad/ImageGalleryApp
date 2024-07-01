import React from 'react'
import './LoginRegister.css';

const LoginRegister = () => {
  return (
    <div className='container login-container'>
      <main>
        <aside>
          <div className='formText'>
            <h3>Register Profile</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit?</p>
          </div>
          <div>
            <form className='loginForm'>
              <div className='formFieldContainer'>
                <lable for='fullName'>Full Name</lable>
                <input type='text' id='fullName' placeholder='Enter Name'/>
              </div>
              <div className='formFieldContainer'>
                <lable for='emailAddress' >Email Address</lable>
                <input type='email' id='emailAddress' placeholder='Enter Email'/>
              </div>
              <div className='formFieldContainer'>
                <lable for='emailAddress'>Password</lable>
                <input type='password' id='password' placeholder='Enter Password'/>
              </div>
              <div className='formFieldContainer'>
                <lable for='confirmPassword'>Email Address</lable>
                <input type='password' id='confirmPassword' placeholder='Enter Password'/>
              </div>
              <div className='formFieldContainer buttonContainer'>
                <input className='formButton' type="button" name="register" id="register" value={"Register"} />
              </div>
            </form>
          </div>
        </aside>
        <div>

        </div>
      </main>
    </div>
  )
}

export default LoginRegister