
import React, { useState } from 'react';
import LoginRegister from '../LoginRegister.module.css';
import ForgotResetStyle from '../ForgotResetPassword.module.css';
import RegisterStyle from '../Register/Register.module.css';
import RegisterFormInput from '../Subcomponents/RegisterFormInput';
import LoginRegisterSubmitButton from '../Subcomponents/LoginRegisterSubmitButton';
import BASE_URL from '../../../config';
import axios from 'axios';


function ForgotPassword() {

	const [formData, setFormData] = useState({
		email: '',
	});

	const initialState = {
		success: '',
		errors:'',
	}
	const [successErrors, setSuccessErrors] = useState(initialState);

	const handleChange = (e) => {
		const { id, value } = e.target;

		setFormData((prevValue) => ({
			...prevValue,
			[id]: value
		}));
	}

	const validateEmail = () => {
		let isValid = true

		if(!formData.email){
			setSuccessErrors((prevErrors) =>({
				...prevErrors,
				errors : 'Email cannot be left blank'
			}));
			isValid = false
		}

		return isValid
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSuccessErrors(initialState);

		if(!validateEmail()) return;
		
		try{
			const response = await axios.post(`${BASE_URL}/account/forgotPassword`, formData);

			if(response.status === 200){

				setSuccessErrors((prevErrors) => ({
					...prevErrors,
					success: response.data
				}))
			}
			console.log(response)

		}
		catch (ex)
		{
			console.error(ex)
			setSuccessErrors((prevErrors) => ({
				...prevErrors,
				errors: ex.response.data
			}))
		}

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
								error=''
								onChange={handleChange}
							/>
							<LoginRegisterSubmitButton
								id='registerButton'
								buttonText='Submit'
							/>
							<span className={LoginRegister.serverSucess}>{successErrors.success}</span>
							<span className={LoginRegister.serverError}>{successErrors.errors}</span>
						</div>
					</form>
				</div>
				<div className={ForgotResetStyle.imageSide}></div>
			</div>
		</div>
	)
}

export default ForgotPassword