import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginRegister from '../LoginRegister.module.css';
import ForgotResetStyle from '../ForgotResetPassword.module.css';
import RegisterStyle from '../Register/Register.module.css';
import RegisterFormInput from '../Subcomponents/RegisterFormInput';
import LoginRegisterSubmitButton from '../Subcomponents/LoginRegisterSubmitButton';
import ChangePasswordStyle from './ChangePassword.module.css'
import axios from 'axios';
import BASE_URL from '../../../config';
import { getUser } from '../../../utils/auth';

function ChangePassword() {

	const user = getUser()

	const navigate = useNavigate();

	const initialState = {
		formData: {
			password: '',
			confirmNewPassword: '',
		},
		successErrors: {
			success: '',
			errors: '',
		},
		formErrors: {
			password: '',
			confirmPassword: '',
		}
	}

	const [formData, setFormData] = useState(initialState.formData);
	const [successErrors, setSuccessErrors] = useState(initialState.successErrors);
	const [formErrors, setFormErrors] = useState(initialState.formErrors);

	const handleChange = (e) => {
		const { id, value } = e.target;

		setFormData((prevValue) => ({
			...prevValue,
			[id]: value
		}));
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		//add js validation

		var data = {
			newPassword :formData.password,
			confirmNewPassword: formData.confirmPassword
		};	

		try {
			const response = await axios.post(`${BASE_URL}/account/changepassword`, data, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
			if (response.status === 200) {
				setFormData(initialState.formData)
				//put these in some dialoge box then when they click you redirect them
				console.log(response.data)

				setFormErrors({}); // MIGHT NEED TO REMOVE THIS WELL SEE
				//setSuccessErrors({
				//	success: "Password has been successfully reset!",
				//	errors: []
				//});

				alert('Password has been successfully changed!')

				navigate('/home');
			}

		}
		catch (err) {
			if (err.response && err.response.status === 400 && err.response.data.errors) {
				const errorMessages = [];
		
				for (const field in err.response.data.errors) {
					if (err.response.data.errors.hasOwnProperty(field)) {
						const error = err.response.data.errors[field];
						
						if (Array.isArray(error)) {
							error.forEach((message) => {
								errorMessages.push(`${message}`);
							});
						} else {
							errorMessages.push(`${error}`);
						}
					}
				}
		
				setSuccessErrors((prevValue) => ({
					...prevValue,
					errors: errorMessages
				}));
			} else {
				console.error(err);
			}
		}
	}

	
	

	return (
		<div className={LoginRegister.container}>
			<div className={ForgotResetStyle.wrapper}>
				<div className={ForgotResetStyle.inputSide}>
					<form className={RegisterStyle.registerForm} onSubmit={handleSubmit}>
						<div className={`${LoginRegister.formText} ${RegisterStyle.formText}`}>
							<h3>Change Password</h3>
						</div>
						<div className={LoginRegister.formInputsWrapper}>
							<RegisterFormInput
								id="password"
								label="Password"
								type="password"
								placeholder="Enter Password"
								value={formData.password}
								error={formErrors.password}
								onChange={handleChange}
							/>
							<RegisterFormInput
								id="confirmPassword"
								label="Confirm Password"
								type="password"
								placeholder="Enter Password"
								value={formData.confirmPassword}
								error={formErrors.confirmPassword}
								onChange={handleChange}
							/>
							<a href="/home" className={ChangePasswordStyle.forgotPassword}>Back to Home?</a>
							<LoginRegisterSubmitButton
								id='registerButton'
								buttonText='Submit'
							/>
							{successErrors.success && (
								<span className={LoginRegister.serverSuccess}>{successErrors.success}</span>
							)}
							{successErrors.errors.length > 0 && (
								<div className={LoginRegister.serverError}>
									{successErrors.errors.map((error, index) => (
										<div key={index}>{error}</div>
									))}
								</div>
							)}
						</div>
					</form>
				</div>
				<div className={ForgotResetStyle.imageSide}></div>
			</div>
		</div>
	)
}

export default ChangePassword