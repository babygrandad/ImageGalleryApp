import React from 'react';
import LoginRegister from '../LoginRegister.module.css';

const LoginRegisterSubmitButton = ({ id, buttonText }) => {
  return (
    <div className={`${LoginRegister.formInfoContainer} ${LoginRegister.buttonContainer}`}>
      <button id={id} className={`${LoginRegister.formButton} button`} type="submit">{buttonText}</button>
    </div>
  );
};

export default LoginRegisterSubmitButton;
