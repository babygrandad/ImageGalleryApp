import React, { useState } from 'react';
import ImageUploaderStyle from './ImageUploader.module.css';

function ImageUploader() {
	const [errorMessage, seterrorMessage] = useState({});
	const [file, setFile] = useState(null);

	const handleDrop = (event) => {
		event.preventDefault();
		const files = event.dataTransfer.files;
		if (files && files.length > 0) {
		  setFile(files[0]);
		}
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setFile(file);
		}
	};

	return (
		<div className={ImageUploaderStyle.dragArea} onDrop={handleDrop} onDragOver={handleDragOver}>
			<span className={`${ImageUploaderStyle.uploadIcon} material-symbols-outlined`}>cloud_upload</span>
			<p className={ImageUploaderStyle.instructionText}>Drag and Drop files here</p>
			<p className={ImageUploaderStyle.orText}>or</p>
			<input
				type="file" 
				className={ImageUploaderStyle.fileInput}
				id='file'
				onChange={handleFileChange}
				multiple={false}
			/>
			<label htmlFor='file' className={ImageUploaderStyle.uploadLabel}>Upload File</label>
			<div>
				{file && (
					<p className={ImageUploaderStyle.selectedFile}>Selected File: {file.name}</p>
				)}
				<p className={ImageUploaderStyle.errorMessage}>{errorMessage.file}</p>
				<p className={ImageUploaderStyle.errorMessage}>{errorMessage.api}</p>
			</div>
		</div>
	);
}

export default ImageUploader;
