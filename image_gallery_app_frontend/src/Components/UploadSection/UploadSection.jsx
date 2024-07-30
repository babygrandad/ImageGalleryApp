import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadStyle from './UploadSection.module.css'
import FormStyles from '../CommonComponents/Forms/FormStyles.module.css'
import LoginRegisterSubmitButton from '../LoginRegister/Subcomponents/LoginRegisterSubmitButton'
import ImageUploader from '../SubComponents/ImageUploader';
import BASE_URL, { IMGBB_KEY, IMGBB_URL } from '../../config';


function UploadSection(props) {

	const [errorMessage, setErrorMessage] = useState(null);
	const [categories, setCategories] = useState([]);
	const [image, setImage] = useState(null);
	const [successErrors, setSuccessErrors] = useState(null);
	const [formData, setFormData] = useState({
		imageName: '',
		imageDescription: '',
		imageTags: [],
		imageURL: '',
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
		console.log("Updated formData:", formData);
	}, [formData]);
	
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
			// If the input field is for tags, split the value into an array
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
			imageDimensions: `${metadata["Image Height"]?.description || ''} x ${metadata["Image Width"]?.description || ''}`,
		}));
		setImage(file);
	};

	// uploads the image to an image hosting site and returns the url 
	const handleUploadtoIMGBB = async (image, info) => {

		if (!image) {
			updateErrors({ imageFile: "Please select an image" });
			console.log("no image falure block");
			return;
		}
		else {

			try {
				var imageData = await axios.post(IMGBB_URL, {
					key: IMGBB_KEY,
					image: image,
					name: info.imageName
				},
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)

				console.log("about to try with the status codes")
				if(imageData && imageData.status === 200)
				{
					console.log("Returning data: ",imageData)
					setFormData((prevData) => ({
						...prevData,
						imageURL: imageData.data.data.display_url,
						imageDeleteURL: imageData.data.data.delete_url,
					}));
				}

				//if (data.status === 200) {
				//	console.log("Seccess: ", formData);
				//	setFormData((prevData) => ({
				//		...prevData,
				//		imageURL: data.display_url,
				//		imageDeleteURL: data.delete_url,
				//	}));
				//}
				//else {
				//	console.log("Fail: ", data)
				//}
			}
			catch (err) {
				console.error("Something went wrong while processing your post: ", err.response.data.error)
			}
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

		return newErrors;
	}

	// Updates the Form Erros
	const updateErrors = (newErrors) => {
		setSuccessErrors((prevData) => ({
			...prevData,
			...newErrors
		}));
	};
	


	const handleSubmit = async (e) => {
		e.preventDefault();
		
		handleUploadtoIMGBB(image, formData);
		
	}

	return (
		<div className={UploadStyle.uploadSection}>
			<form className={UploadStyle.uploadForm} onSubmit={handleSubmit} autoComplete="off">
				<h4 className={FormStyles.formText}>Image Upload</h4>
				<div className={`${FormStyles.formInputsWrapper} ${UploadStyle.inputsWrapper} `}>
					{errorMessage && <div className="error-message">{errorMessage}</div>}{/*	Come back here to add and show errors*/}
					<div className={FormStyles.formInfoContainer}>{/*	Image Title */}
						<label htmlFor="imageName" className={FormStyles.formLable}>Image Title</label>
						<input type="text" onChange={handleChange} name="imageName" id="imageName" className={`${FormStyles.inputField} inputField`} />
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
							<option value="" >--Please choose an option--</option>
							{categories.map((category) => (
								<option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
							))}
						</select>
					</div>
					<div className={FormStyles.formInfoContainer}> {/*	Image Tags */}
						<label htmlFor="imageTags" className={FormStyles.formLable}>Image Tags</label>
						<input type="text" onChange={handleChange} value={formData.imageTags} name="imageTags" id="imageTags" className={`${FormStyles.inputField} inputField`} />
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
					</div>

					<div className={`${FormStyles.formInfoContainer} `}>
						<ImageUploader onMetadata={handleMetadata} />
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
