import React from 'react'
import LoginRegister from '../LoginRegister.module.css'

const Register = () => {
  return (
    <div className={`${LoginRegister.loginRegisterContainer} ${LoginRegister.Container}`}>
      <aside>
          <div className={LoginRegister.formText}>
            <h3>Register Profile</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit?</p>
          </div>
          <div>
            <form className={LoginRegister.loginRegisterForm} autoComplete='false'>
            <div className={LoginRegister.formFieldContainer}>
                <lable for='fullName'>Full Name</lable>
                <input className='inputField' type='text' id='fullName' placeholder='Enter Name' />
              </div>
              <div className={LoginRegister.formFieldContainer}>
                <lable for='emailAddress' >Email Address</lable>
                <input className='inputField' type='email' id='emailAddress' placeholder='Enter Email' />
              </div>
              <div className={LoginRegister.formFieldContainer}>
                <lable for='emailAddress'>Password</lable>
                <input className='inputField' type='password' id='password' placeholder='Enter Password' />
              </div>
              <div className={LoginRegister.formFieldContainer}>
                <lable for='confirmPassword'>Email Address</lable>
                <input className='inputField' type='password' id='confirmPassword' placeholder='Enter Password' />
              </div>
              <div className={`${LoginRegister.formFieldContainer} ${LoginRegister.buttonContainer}`}>
                <input className={`${LoginRegister.formButton} button`} type="button" name="register" id="register" value={"Register"} />
              </div>
              <div className={`${LoginRegister.formFieldContainer} ${LoginRegister.alternateLogin}`}>
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