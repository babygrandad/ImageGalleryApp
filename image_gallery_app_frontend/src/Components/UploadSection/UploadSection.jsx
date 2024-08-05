import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadStyle from './UploadSection.module.css'
import FormStyles from '../CommonComponents/Forms/FormStyles.module.css'
import LoginRegisterSubmitButton from '../LoginRegister/Subcomponents/LoginRegisterSubmitButton'
import ImageUploader from '../SubComponents/ImageUploader';
import BASE_URL, { IMGBB_KEY, IMGBB_URL } from '../../config';


function UploadSection(props) {

	const [serverResponse, setServerResponse] = useState(null);
	const [categories, setCategories] = useState([]);
	const [image, setImage] = useState(null);
	const [successErrors, setSuccessErrors] = useState(null);
	const [payload, setPayload] = useState(null)
	const [formData, setFormData] = useState({
		imageName: '',
		imageDescription: '',
		imageTags: [],
		imageURL: '',
		imageThumbnailURL: '',
		imageDeleteURL: '',
		imageDimensions: '',
		imageCategory: '',
		fileSize: '',
		dateCaptured: null,
		make: null,
		model: null,
		lenseType: null,
	});

	//	to track the state of form data
	useEffect(() => {
		const updatedPayload = {
			...formData,
			imageTags: formData.imageTags.map(tag => tag.trim())
		};
		setPayload(updatedPayload);
	}, [formData]);

	// This useEffect is to log the payload whenever it updates
	useEffect(() => {
		console.log("Payload: ", payload);
	}, [payload]);

	// retrieves and sets the dropdown options for the Categories
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/category`);
				setCategories(updateCategories(response.data))
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

	//	Updates the List after being Capitalized
	const updateCategories = (items) => {
		return items.map(category => ({
			...category,
			categoryName: capitalizeFirstLetter(category.categoryName)
		}))
	}

	//handles the changes on the form
	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevData) => {
			
			if (name === "imageTags") {
				const tagsArray = value.split(",");
				return { ...prevData, [name]: tagsArray };
			}

			// For other form fields, just update the value
			return { ...prevData, [name]: value };
		});
	};

	// collects the metadata from the image
	const handleMetadata = ({ metadata, file }) => {
		setFormData((prevData) => ({
			...prevData,

			make: metadata["Make"]?.description || '',
			model: metadata["Model"]?.description || '',
			dateCaptured: metadata["DateTime"]?.description || '',
			fileSize: file.size || '',
			lenseType: metadata["Lens"]?.description || '',
			imageDimensions: `${metadata["Image Height"]?.value || ''}x${metadata["Image Width"]?.value || ''}`,
		}));
		setImage(file);
	};

	// uploads the image to an image hosting site and returns the url 
	const handleUploadToIMGBB = async (image, info) => {

		if (!image) {
			updateErrors({ imageFile: "Please select an image" });
			console.log(successErrors);
			console.log("no image falure block");
			return;
		}
		else {

			try {
				var imageData = await axios.post(IMGBB_URL, {
					key: IMGBB_KEY,
					image: image,
					name: info.imageName, //info.imageName
				},
					{
						headers: {'Content-Type':'multipart/form-data'}
					}
				)

				if(imageData && imageData.status === 200)
				{
					console.log("Returning data: ",imageData)
					setFormData((prevData) => ({
						...prevData,
						imageURL: imageData.data.data.display_url,
						imageDeleteURL: imageData.data.data.delete_url,
						imageThumbnailURL: imageData.data.data.thumb.url
					}));
				}
			}
			catch (err) { // convert the error to display on the front end as for now it only shows on console
				console.error("Something went wrong while processing your post: ", err.response.data.error.message)
				setServerResponse(err.response.data.error.message)
				
			}
		}
	}

	const handleUploadToDB = async () =>{
		try{
			const response = await axios.post(`${BASE_URL}/image`, formData);
		}
		catch (err){
			console.error(err)
		}
	}

	// Validates the form checks for empty fields
	const validateForm = () => {
		const newErrors = {};
		if (!formData.imageName) newErrors.imageName = "Image Title field cannot be left blank";
		if (!formData.imageDescription) newErrors.imageDescription = "Image Description field cannot be left blank";
		if (!formData.imageCategory) newErrors.imageCategory = "Please select a category from the list";
		if (formData.imageTags.length < 2) newErrors.imageTags = "You need to give at least 2 tags";
		if (formData.imageTags.length > 5) newErrors.imageTags = "You can only provide a maximum of 5 tags";
		if (!image) newErrors.imageFile = "You have not yet selected an image to upload";
	
		setSuccessErrors(newErrors);
		return newErrors;
	};

	// Updates the Form Erros
	const updateErrors = (newErrors) => {
		setSuccessErrors((prevData) => ({
			...prevData,
			...newErrors
		}));
	};
	


	const handleSubmit = (e) => {
		e.preventDefault();
		setSuccessErrors(null); // Reset errors before validation
		setServerResponse(null); // Reset server messages
	
		// Validate the form and update errors
		const newErrors = validateForm();
		if (Object.keys(newErrors).length === 0) {
			// Proceed with image upload if there are no errors
			handleUploadToIMGBB(image, formData);

			// reset form and all other states

			console.log("No errors you can proceed.")
		} else {
			// Log errors if any
			console.log(newErrors);
		}
	};

	return (
		<div className={UploadStyle.uploadSection}>
			<form className={UploadStyle.uploadForm} onSubmit={handleSubmit} autoComplete="off">
				<h4 className={FormStyles.formText}>Image Upload</h4>
				<div className={`${FormStyles.formInputsWrapper} ${UploadStyle.inputsWrapper} `}>
					<div className={FormStyles.formInfoContainer}>{/*	Image Title */}
						<label htmlFor="imageName" className={FormStyles.formLable}>Image Title</label>
						<input type="text" onChange={handleChange} name="imageName" id="imageName" className={`${FormStyles.inputField} inputField`} />
						<span>//errors here</span>
					</div>
					<div className={FormStyles.formInfoContainer}> {/*	Image Category */}
						<label htmlFor="imageCategory" className={FormStyles.formLable}>Image Category</label>
						<select
							type="select"
							name="imageCategory"
							id="imageCategory"
							className={`${FormStyles.inputField} inputField`}
							onChange={handleChange}
						>
							<option value="">--Please choose an option--</option>
							{categories.map((category) => (
								<option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
							))}
						</select>
						<span>//errors here</span>
					</div>
					<div className={FormStyles.formInfoContainer}> {/*	Image Tags */}
						<label htmlFor="imageTags" className={FormStyles.formLable}>Image Tags</label>
						<input type="text" onChange={handleChange} value={formData.imageTags} name="imageTags" id="imageTags" className={`${FormStyles.inputField} inputField`} />
						<span>//errors here</span>
					</div>
					<div className={FormStyles.formInfoContainer}> {/*	Image Description */}
						<label htmlFor="imageDescription" className={FormStyles.formLable}>Image Description</label>
						<textarea
							name="imageDescription"
							id="imageDescription"
							rows="5"
							onChange={handleChange}
							className='inputField'
							style={{ resize: 'none' }}
						/>
						<span>//errors here</span>
					</div>

					<div className={`${FormStyles.formInfoContainer} `}>
						<ImageUploader onMetadata={handleMetadata} />
						<span>//erros here</span>
					</div>
					{serverResponse && <div className="error-message">{serverResponse}</div>}{/*	server response here*/}
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
