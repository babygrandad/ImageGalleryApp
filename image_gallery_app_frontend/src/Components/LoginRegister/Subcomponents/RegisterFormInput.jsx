import React from 'react';
import LoginRegister from '../LoginRegister.module.css';
import RegisterStyle from '../Register/Register.module.css';

const RegisterFormInput = ({ id, label, type, placeholder, value, error, onChange }) => {
  return (
    <div className={LoginRegister.formInfoContainer}>
      <label htmlFor={id} className={LoginRegister.formLable}>{label}</label>
      <div className={RegisterStyle.formFieldWrapper}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`${RegisterStyle.inputField} inputField`}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <span id={`${id}Error`} className={LoginRegister.errorText}>{error}</span>}
    </div>
  );
};

export default RegisterFormInput;
