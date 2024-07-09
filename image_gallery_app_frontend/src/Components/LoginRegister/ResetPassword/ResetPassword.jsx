import React, { useState } from 'react';
import LoginRegister from '../LoginRegister.module.css';
import ForgotResetStyle from '../ForgotResetPassword.module.css';
import RegisterStyle from '../Register/Register.module.css';
import RegisterFormInput from '../Subcomponents/RegisterFormInput';
import LoginRegisterSubmitButton from '../Subcomponents/LoginRegisterSubmitButton';

function ResetPassword() {
	const [formData, setFormData] = useState({
		password:'',
		confirmPassword:'',
	});
	const [successErrors, setSuccessErrors] = useState({
		password:'',
		confirmPassword:'',
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
							<h3>Reset Password</h3>
						</div>
						<div className={LoginRegister.formInputsWrapper}>
							<RegisterFormInput
								id="password"
								label="Password"
								type="password"
								placeholder="Enter Password"
								value={formData.password}
								error={successErrors.password}
								onChange={handleChange}
							/>
							<RegisterFormInput
								id="confirmPassword"
								label="Confirm Password"
								type="password"
								placeholder="Enter Password"
								value={formData.confirmPassword}
								error={successErrors.confirmPassword}
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

export default ResetPassword