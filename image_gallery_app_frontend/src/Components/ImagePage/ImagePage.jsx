import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../config'
import axios from 'axios';
import { getUser } from '../../utils/auth';
import ImagePageStyle from './ImagePage.module.css'
import Modal from '../SubComponents/Modal';

function ImagePage() {
  const { imageID } = useParams();
  const user = getUser();
  const imgRef = useRef(null);

  const initialState = {
    imageID: '',
    imageName: '',
    imageDescription: '',
    uploadDate: '',
    lastUpdated: '',
    imageURL: '',
    imageDeleteURL: '',
    imageThumbnailURL: '',
    fullName: '',
    imageDimensions: '',
    fileSize: '',
    dateCaptured: '',
    make: '',
    model: '',
    lenseType: '',
    category: {},
    tags: [],
    likesCount: '',
    comments: []
  }

  const [image, setImage] = useState(initialState);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(null);
  const [newComment, setNewComment] = useState(null);
  const [imageClasses, setImageClasses] = useState({
    wrapper: '',
    container: '',
    image: ''
  });


  // State for handling the modal
  const [modalData, setModalData] = useState(null); // Object with item type, content, etc.
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility


  useEffect(() => {
    const imageData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/Image/${imageID}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        console.log('Response:', response.data);
        setImage(response.data)
        setLikes(response.data.likesCount)
        setComments(response.data.comments.reverse(),)
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };

    if (imageID) {
      imageData();
    }
  }, [imageID]);

  const handleSendComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/comment/${imageID}`, { commentContent: newComment }, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      // Update the comments array with the new comment at the front
      setComments((prevComments) => [
        response.data,  // Add the new comment at the start
        ...prevComments // Spread the previous comments
      ]);

      setNewComment('');

    } catch (ex) {
      alert("Dear developer - Check the console");
      console.error("Error occurred: ", ex);
    }
  };

  const handleDeleteComment = async (commentID) => {
    try {
      const response = await axios.delete(`${BASE_URL}/comment/${commentID}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      // Update the comments state to remove the deleted comment
      setComments((prevComments) => prevComments.filter(comment => comment.commentID !== commentID));

      // Inform the user that the comment was deleted
      alert("Comment was deleted");

    } catch (ex) {
      alert("Dear developer - Check the console");
      console.error("Error occurred: ", ex);
    }
  };

  const handleUpdateComment = async ({ item, updatedItemContent }) => {
    
    if(!updatedItemContent.trim()){
      alert("You cannot leave empty fields")
      return;
    }
    
    try {
      await axios.patch(`${BASE_URL}/comment/${item.commentID}`,
        { commentContent: updatedItemContent },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Update the comments array with the updated comment
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.commentID === item.commentID
            ? { ...comment, commentContent: updatedItemContent, isEdited: true }
            : comment
        )
      );

      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleUpdateImage = async ({ updatedImageName, updatedItemContent }) => {
    // Validation checks for empty fields
    if (!updatedImageName.trim() || !updatedItemContent.trim()) {
      alert("You cannot leave empty fields");
      return;
    }

    try {
      await axios.patch(
        `${BASE_URL}/image/${image.imageID}`,
        {
          imageName: updatedImageName,
          imageDescription: updatedItemContent,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Update the image details in the state
      setImage((prevImage) => ({
        ...prevImage,
        imageName: updatedImageName,
        imageDescription: updatedItemContent,
      }));

      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  const handleOpenModalForImage = () => {
    setModalData({
      item: 'Image',
      ItemContent: image.imageDescription,
      imageName: image.imageName,
    });
    setIsModalOpen(true);
  };

  const handleOpenModalForComment = (comment) => {
    setModalData({
      item: 'Comment',
      ItemContent: comment.commentContent,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setNewComment(e.target.value); // Update state with input value
  };

  const handleImageLoad = () => {
    if (imgRef.current) {
      const naturalWidth = imgRef.current.naturalWidth;
      const naturalHeight = imgRef.current.naturalHeight;
      setImageClasses({
        wrapper: naturalWidth > naturalHeight ? ImagePageStyle.wideWrapper : ImagePageStyle.tallWrapper,
        container: naturalWidth > naturalHeight ? ImagePageStyle.wideContainer : ImagePageStyle.tallContainer,
        image: naturalWidth > naturalHeight ? ImagePageStyle.wideImage : ImagePageStyle.tallImage
      })
    }
  };

  const handleLikes = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/like/${imageID}`, {}, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.data === "Image liked.") {
        setLikes(prevLikes => prevLikes + 1);  // Increment the likes count
      } else if (response.data === "Image unliked.") {
        setLikes(prevLikes => prevLikes - 1);  // Decrement the likes count
      }
    } catch (error) {
      console.error('Error processing like data:', error);
    }
  };

  return (
    <div className={ImagePageStyle.wrapper}>
      <div className={`${ImagePageStyle.ImageWrapper} ${imageClasses.wrapper}`}>
        <div className={`${ImagePageStyle.ImageContainer} ${imageClasses.container}`}>
          {image.email == user.email && (
          <div className={`${ImagePageStyle.closingContainer}`}>
            <span className={`${ImagePageStyle.detailsEditIcons} ${ImagePageStyle.actionButtonPrimary} material-symbols-outlined`}
              onClick={ handleOpenModalForImage }
            >
              edit</span>
            <span className={`${ImagePageStyle.detailsEditIcons} ${ImagePageStyle.actionButtonAccent} material-symbols-outlined`}>delete</span>
          </div>
          )}
          <img ref={imgRef} className={`${ImagePageStyle.Image} ${imageClasses.image}`} src={image.imageURL} alt={image.imageName} onLoad={handleImageLoad} />
          <div className={ImagePageStyle.imageDetailsWrapper}>
            {image.tags.length > 0 && image.tags.map((tag) => (
              <span className={ImagePageStyle.tags} key={tag.tagName}>{tag.tagName.trim()}</span>
            ))}

            <div className={ImagePageStyle.ImageDetails}>
              <h5 className={ImagePageStyle.imageName}>{image.imageName}</h5>
              <p className={ImagePageStyle.imageDescription}>{image.imageDescription}</p>
            </div>
          </div>
        </div>

        <div className={ImagePageStyle.socialWrapper}>
          <div className={ImagePageStyle.socialButtoncontainer}>
            <span className={`${ImagePageStyle.socialButton} material-symbols-outlined`} onClick={handleLikes}>favorite</span>
            <span className={`${ImagePageStyle.socialCount} ${ImagePageStyle.likesCount}`}>{likes}</span>
          </div>
          <div className={ImagePageStyle.socialButtoncontainer}>
            <span className={`${ImagePageStyle.socialButton} material-symbols-outlined`}>chat_bubble</span>
            <span className={`${ImagePageStyle.socialCount} ${ImagePageStyle.commentCount}`}>{comments.length}</span>
          </div>
        </div>

        <div className={ImagePageStyle.commentsContainer}>
          <h4>Comments</h4>
          <form autoComplete='off' className={`${ImagePageStyle.commentForm}`} onSubmit={handleSendComment}>
            <input className={ImagePageStyle.commentInputField} value={newComment} placeholder='Write your comment...' type="text" onChange={handleChange} />
            <span className={`${ImagePageStyle.sendCommentIcon} material-symbols-outlined`} onClick={handleSendComment}>send</span>
          </form>
          {comments.length > 0 && comments.map((comment) => (
            <div className={ImagePageStyle.commentWrapper} key={comment.commentID}>
              <div className={ImagePageStyle.nameAndActions}>
                <h5>
                  {comment.fullName}
                  {comment.isEdited ? <span className={ImagePageStyle.editedComment}>Edited</span> : ""}
                </h5>
                {comment.email === user.email && (
                  <div className={ImagePageStyle.crudWrapper}>
                    <div className={ImagePageStyle.crudButtoncontainer}>
                      <span className={`${ImagePageStyle.actionButton} ${ImagePageStyle.actionButtonPrimary} material-symbols-outlined`}
                        onClick={() => handleOpenModalForComment(comment)}
                      >
                        edit
                      </span>
                    </div>
                    <div className={ImagePageStyle.crudButtoncontainer}>
                      <span
                        className={`${ImagePageStyle.actionButton} ${ImagePageStyle.actionButtonAccent} material-symbols-outlined`}
                        onClick={() => handleDeleteComment(comment.commentID)}>
                        delete
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <p className={ImagePageStyle.commentText}>{comment.commentContent}</p>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && modalData && (
        <Modal
          item={modalData.item}
          ItemContent={modalData.ItemContent}
          imageName={modalData.imageName}
          onUpdate={modalData.item === 'Image' ? handleUpdateImage : handleUpdateComment}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  )
}

export default ImagePage 