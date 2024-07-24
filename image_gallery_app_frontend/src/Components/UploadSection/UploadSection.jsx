import React, { useState } from 'react';
import UploadStyle from './UploadSection.module.css'
import FormStyles from '../CommonComponents/Forms/FormStyles.module.css'
import LoginRegisterSubmitButton from '../LoginRegister/Subcomponents/LoginRegisterSubmitButton'
import ImageUploader from '../SubComponents/ImageUploader';


function UploadSection(props) {


	const [selectedFile, setSelectedFile] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
  
	const handleSubmit = (e) => {
	  e.preventDefault();

	  console.log('name', e.target.name)
  
	  // Handle file upload here (placeholder)
	//  if (!selectedFile) {
	//	setErrorMessage('Please select a file to upload');
	//	return;
	//  }
  
	  // Implement logic to send the form data and file to your server
	  // You can use libraries like axios or Fetch API
  
	  // Clear error message and selected file after successful upload (placeholder)
	//  setErrorMessage(null);
	//  setSelectedFile(null);
	}
  
	const handleFileChange = (event) => {
	  setSelectedFile(event.target.files[0]);
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
							<option value="">--Please choose an option--</option>
							<option value="Option 1">Option 1</option>
							<option value="Option 2">Option 2</option>
							<option value="Option 3">Option 3</option>
							<option value="Option 4">Option 4</option>
							<option value="Option 5">Option 5</option>
							<option value="Option 6">Option 6</option>
							<option value="Option 7">Option 7</option>
							<option value="Option 8">Option 8</option>
							<option value="Option 9">Option 9</option>
							<option value="Option 10">Option 10</option>
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
