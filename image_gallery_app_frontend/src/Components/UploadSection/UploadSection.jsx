import React from 'react'
import UploadStyle from './UploadSection.module.css'
import FormStyles from '../CommonComponents/Forms/FormStyles.module.css'

function UploadSection(props) {
  return (
	<div className={UploadStyle.uploadSection}>
		<form className={UploadStyle.uploadForm}>
			<h4 className={FormStyles.formText}>Image Upload</h4>
			<div className={`${FormStyles.formInputsWrapper} ${UploadStyle.inputsWrapper} `}>
				<div className={FormStyles.formInfoContainer}>
					<label htmlFor="imageTitle" className={FormStyles.formLable}>Image Title</label>
					<input type="text" name="imageTitle" id="imageTitle" className={`${FormStyles.inputField} inputField`} />
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


			</div>
		</form>
	</div>
  )
}

export default UploadSection
