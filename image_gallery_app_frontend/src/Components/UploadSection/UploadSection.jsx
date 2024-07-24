import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadStyle from './UploadSection.module.css'
import FormStyles from '../CommonComponents/Forms/FormStyles.module.css'
import LoginRegisterSubmitButton from '../LoginRegister/Subcomponents/LoginRegisterSubmitButton'
import ImageUploader from '../SubComponents/ImageUploader';
import BASE_URL from '../../config';


function UploadSection(props) {

	const [errorMessage, setErrorMessage] = useState(null);
	const [categories, setCategories] = useState([]);

	// retrieves and sets the dropdown options for the Categories
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/category`);
				const categoryNames = response.data.map((item) => capitalizeFirstLetter(item.categoryName));
				setCategories(categoryNames)
			} catch (error) {
				console.log(error);
			}
		};
		fetchCategories();
	}, []);

	// Capitalizez the first letter of every category option 
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('name', e.target.name)
	}

	return (
		<div className={UploadStyle.uploadSection}>
			<form className={UploadStyle.uploadForm} onSubmit={handleSubmit}>
				<h4 className={FormStyles.formText}>Image Upload</h4>
				<div className={`${FormStyles.formInputsWrapper} ${UploadStyle.inputsWrapper} `}>
					{errorMessage && <div className="error-message">{errorMessage}</div>}
					<div className={FormStyles.formInfoContainer}>
						<label htmlFor="imageTitle" className={FormStyles.formLable}>Image Title</label>
						<input type="text" name="imageTitle" id="imageTitle" className={`${FormStyles.inputField} inputField`} />
					</div>
					<div className={FormStyles.formInfoContainer}>
						<label htmlFor="imageCategory" className={FormStyles.formLable}>Image Category</label>
						<select type="select" name="imageCategory" id="imageCategory" className={`${FormStyles.inputField} inputField`} >
							<option value="" >--Please choose an option--</option>
							{categories.map((category, index) => (
								<option key={index} value={category}>{category}</option>
							))}
						</select>
					</div>
					<div className={FormStyles.formInfoContainer}>
						<label htmlFor="imageTags" className={FormStyles.formLable}>Image Tags</label>
						<input type="text" name="imageTags" id="imageTags" className={`${FormStyles.inputField} inputField`} />
					</div>
					<div className={FormStyles.formInfoContainer}>
						<label htmlFor="imageDescription" className={FormStyles.formLable}>Image Description</label>
						<textarea
							name="imageDescription"
							id="imageDescription"
							rows="5"
							className='inputField'
							style={{ resize: 'none' }}
						/>
					</div>

					<div className={`${FormStyles.formInfoContainer} `}>
						<ImageUploader />
					</div>
					<LoginRegisterSubmitButton
						id='uploadImage'
						buttonText='Save'
					/>
				</div>
			</form>
		</div>
	)
}

export default UploadSection
