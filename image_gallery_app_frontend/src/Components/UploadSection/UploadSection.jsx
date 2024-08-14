import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadStyle from './UploadSection.module.css';
import FormStyles from '../CommonComponents/Forms/FormStyles.module.css';
import LoginRegisterSubmitButton from '../LoginRegister/Subcomponents/LoginRegisterSubmitButton';
import ImageUploader from '../SubComponents/ImageUploader';
import BASE_URL, { IMGBB_KEY, IMGBB_URL } from '../../config';
import { getUser } from '../../utils/auth';

function UploadSection(props) {

    const initialState = {
        formData: {
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
        },
    }

    const [serverResponse, setServerResponse] = useState(null);
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [successErrors, setSuccessErrors] = useState(null);
    const [payload, setPayload] = useState(initialState.formData);
    const [formData, setFormData] = useState(initialState.formData);
    const [reset, setReset] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const user = getUser();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/category`);
                setCategories(updateCategories(response.data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() =>{
        setPayload(formData);
    }, [formData])

    useEffect(() =>{
        console.log("Payload: ",payload)
    }, [payload])

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const updateCategories = (items) => {
        return items.map(category => ({
            ...category,
            categoryName: capitalizeFirstLetter(category.categoryName)
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            return { ...prevData, [name]: value };
        });
    };

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleTagInputKeyDown = (e) => {
        if (e.key !== 'Enter' && e.key !== ',') return;
    
        e.preventDefault(); // Prevents form submission
        const value = tagInput.trim();
    
        if (!value || formData.imageTags.includes(value)) return;
    
        const updatedTags = [...formData.imageTags, value];
        setFormData((prevData) => ({ ...prevData, imageTags: updatedTags }));
        setTagInput(''); // Clear input
    };
    
    const removeTag = (indexToRemove) => {
        setFormData((prevData) => ({
            ...prevData,
            imageTags: prevData.imageTags.filter((_, index) => index !== indexToRemove)
        }));
    };

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

    const handleUploadToIMGBB = async (image, info) => {
        if (!image) {
            updateErrors({ imageFile: "Please select an image" });
            console.log(successErrors);
            console.log("no image failure block");
            return;
        } else {
            try {
                const form = new FormData();
                form.append('key', IMGBB_KEY);
                form.append('image', image);
                form.append('name', info.imageName);

                const imageData = await axios.post(IMGBB_URL, form, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (imageData && imageData.status === 200) {
                    console.log("Returning data: ", imageData);
                    const updatedFormData = {
                        ...formData,
                        imageURL: imageData.data.data.display_url,
                        imageDeleteURL: imageData.data.data.delete_url,
                        imageThumbnailURL: imageData.data.data.thumb.url
                    };

                    setFormData(updatedFormData);
                    await handleUploadToDB(updatedFormData);
                }
            } catch (err) {
                console.error("Something went wrong while processing your post: ", err.response.data.error.message);
                setServerResponse(err.response.data.error.message);
                handleFailedImage();
            }
        }
    };

    const handleFailedImage = () => {
        axios.get(formData.imageDeleteURL);
    };

    const handleUploadToDB = async (payload) => {
        try {
            const response = await axios.post(`${BASE_URL}/image`, payload, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            console.log(response.data);
            alert(response.data)
            setFormData(initialState.formData); //reset form to empty
            setReset(true);
            setTimeout(() => setReset(false), 100); // Reset the flag after a short delay to avoid immediate reset issues

        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.imageName) newErrors.imageName = "Image Title field cannot be left blank";
        if (!formData.imageDescription) newErrors.imageDescription = "Image Description field cannot be left blank";
        if (!formData.imageCategory) newErrors.imageCategory = "Please select a category from the list";
        if (!formData.imageTags || formData.imageTags.length < 2) newErrors.imageTags = "You need to provide at least 2 tags";
        if (formData.imageTags.length > 5) newErrors.imageTags = "You can only provide a maximum of 5 tags";
        if (!image) newErrors.imageFile = "You have not yet selected an image to upload";

        setSuccessErrors(newErrors);
        return newErrors;
    };

    const updateErrors = (newErrors) => {
        setSuccessErrors((prevData) => ({
            ...prevData,
            ...newErrors
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessErrors(null);
        setServerResponse(null);

        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            try {
                await handleUploadToIMGBB(image, formData);
            } catch (error) {
                console.error("Error in submission process:", error);
            }
        } else {
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
                        <input type="text" onChange={handleChange} value={formData.imageName} name="imageName" id="imageName" className={`${FormStyles.inputField} inputField`} />
                        {successErrors?.imageName && <span className={FormStyles.error}>{successErrors.imageName}</span>}
                    </div>
                    <div className={FormStyles.formInfoContainer}> {/*	Image Category */}
                        <label htmlFor="imageCategory" className={FormStyles.formLable}>Image Category</label>
                        <select
                            type="select"
                            name="imageCategory"
                            id="imageCategory"
                            value={formData.imageCategory}
                            className={`${FormStyles.inputField} inputField`}
                            onChange={handleChange}
                        >
                            <option value="">--Please choose an option--</option>
                            {categories.length > 0 && categories.map((category) => (
                                <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                            ))}
                        </select>
                        {successErrors?.imageCategory && <span className={FormStyles.error}>{successErrors.imageCategory}</span>}
                    </div>
                    <div className={FormStyles.formInfoContainer}> {/*	Image Tags */}
                        <label htmlFor="imageTags" className={FormStyles.formLable}>Image Tags</label>
                        <div className={`${UploadStyle.tagsContainer}`}>
                            {formData.imageTags.length > 0 && formData.imageTags.map((tag, index) => (
                                <div key={tag} className={UploadStyle.tagItem}>
                                    <span className={UploadStyle.tagText}>{tag}</span>
                                    <span onClick={() => removeTag(index)} className={`${UploadStyle.tagClose} material-symbols-outlined`}>close</span>
                                </div>
                            ))}
                            <input
                                type="text"
                                value={tagInput}
                                onChange={handleTagInputChange}
                                onKeyDown={handleTagInputKeyDown}
                                name="imageTags"
                                id="imageTags"
                                className={UploadStyle.tagsInput}
                                placeholder='Type in tags and press Enter'
                            />
                        </div>
                        {successErrors?.imageTags && <span className={FormStyles.error}>{successErrors.imageTags}</span>}
                    </div>
                    <div className={FormStyles.formInfoContainer}> {/*	Image Description */}
                        <label htmlFor="imageDescription" className={FormStyles.formLable}>Image Description</label>
                        <textarea
                            name="imageDescription"
                            id="imageDescription"
                            rows="5"
                            value={formData.imageDescription}
                            onChange={handleChange}
                            className='inputField'
                            style={{ resize: 'none' }}
                        />
                        {successErrors?.imageDescription && <span className={FormStyles.error}>{successErrors.imageDescription}</span>}
                    </div>

                    <div className={`${FormStyles.formInfoContainer} `}>
                        <ImageUploader onMetadata={handleMetadata} resetState={reset} />
                        {successErrors?.imageFile && <span className={FormStyles.error}>{successErrors.imageFile}</span>}
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

export default UploadSection;
