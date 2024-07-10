
import React, { useState } from 'react';
import LoginRegister from '../LoginRegister.module.css';
import ForgotResetStyle from '../ForgotResetPassword.module.css';
import RegisterStyle from '../Register/Register.module.css';
import RegisterFormInput from '../Subcomponents/RegisterFormInput';
import LoginRegisterSubmitButton from '../Subcomponents/LoginRegisterSubmitButton';


function ForgotPassword() {

	const [formData, setFormData] = useState({
		email: '',
	});
	const [successErrors, setSuccessErrors] = useState({
		email: '',
	});

	const handleChange = (e) => {
		const { id, value } = e.target;

		setFormData((prevValue) => ({
			...prevValue,
			[id]: value
		}));
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
	}


	return (
		<div className={LoginRegister.container}>
			<div className={ForgotResetStyle.wrapper}>
				<div className={ForgotResetStyle.inputSide}>
					<form className={RegisterStyle.registerForm} onSubmit={handleSubmit}>
						<div className={`${LoginRegister.formText} ${RegisterStyle.formText}`}>
							<h3>Forgot Password</h3>
						</div>
						<div className={LoginRegister.formInputsWrapper}>
							<RegisterFormInput
								id="email"
								label="Email Address"
								type="email"
								placeholder="Enter Email"
								value={formData.email}
								error={successErrors.email}
								onChange={handleChange}
							/>
							<LoginRegisterSubmitButton
								id='registerButton'
								buttonText='Submit'
							/>
						</div>
					</form>
				</div>
				<div className={ForgotResetStyle.imageSide}></div>
			</div>
		</div>
	)
}

export default ForgotPassword