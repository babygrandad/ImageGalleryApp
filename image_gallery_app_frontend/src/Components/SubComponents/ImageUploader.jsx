import React, { useState, useEffect } from 'react';
import ImageUploaderStyle from './ImageUploader.module.css';
import * as ExifReader from 'exifreader';

function ImageUploader({ onMetadata }) {
	const [errorMessage, seterrorMessage] = useState({});
	const [file, setFile] = useState(null);

	useEffect(() => {
		if (file) {

			const fetchExifData = async () => {
				if (file) {
					const blob = new Blob([file], { type: file.type });
					const metadata = await ExifReader.load(file); // -- -- Same function as below in the try catch remove if that one works
					try {
						onMetadata({ file, metadata }); // Pass the metadata to the parent
					} catch (error) {
						//setErrorMessage({ ...errorMessage, api: 'Failed to load EXIF data.' });
						console.log("Failed to load EXIF data")
					}
					console.log("File FUll: ", file);
					console.log("MetaData FUll: ", metadata);
				}
			};

			fetchExifData();

		}
	}, [file]);

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleDrop = (event) => {
		event.preventDefault();
		const files = event.dataTransfer.files;
		if (files && files.length > 0) {
			setFile(files[0]);
		}
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
			<label htmlFor='file' className={ImageUploaderStyle.uploadLabel}>Upload</label>
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
