// Modal.js
import React, { useState } from 'react';
import FormStyles from '../CommonComponents/Forms/FormStyles.module.css';
import ModalStyles from './Modal.module.css';

function Modal({ item, ItemContent, imageName, onUpdate, setIsModalOpen }) {
  const [updatedImageName, setUpdatedImageName] = useState(imageName || '');
  const [updatedItemContent, setUpdatedItemContent] = useState(ItemContent);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'imageName') {
      setUpdatedImageName(value);
    } else if (name === 'ItemContent') {
      setUpdatedItemContent(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call onUpdate with appropriate fields based on presence of imageName
    onUpdate({
      item,
      updatedItemContent,
      ...(imageName && { updatedImageName }), // Only include imageName if it's present
    });
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className={ModalStyles.modalBackground} onClick={() => setIsModalOpen(false)}>
      <div className={ModalStyles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={ModalStyles.closeActionWrapper}>
          <h5>Update {item}</h5>
          <span
            className={`${ModalStyles.closeActionButton} material-symbols-outlined`}
            onClick={() => setIsModalOpen(false)}
          >
            close
          </span>
        </div>
        <form autoComplete="off" className={ModalStyles.modalForm} onSubmit={handleSubmit}>
          {imageName && (
            <div className={FormStyles.formInfoContainer}>
              <label htmlFor="imageName" className={FormStyles.formLable}>
                Image Title
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={updatedImageName}
                name="imageName"
                id="imageName"
                className={`${FormStyles.inputField} inputField`}
              />
            </div>
          )}
          <div className={FormStyles.formInfoContainer}>
            <label htmlFor="ItemContent" className={FormStyles.formLable}>
              {imageName ? 'Image Description' : 'Comment Content'}
            </label>
            <textarea
              name="ItemContent"
              id="ItemContent"
              rows="5"
              maxLength={imageName ? '100' : '50'}
              value={updatedItemContent}
              onChange={handleChange}
              className="inputField"
              style={{ resize: 'none' }}
            />
          </div>
          <button type="submit" className={`${ModalStyles.submitButton} button`}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
