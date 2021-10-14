import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readAndCompressImage } from 'browser-image-resizer';
import { useParams } from 'react-router-dom';



function ProfilePage() {

    const imageConfig = {
        quality: 1.0,
        maxHeight: 300,
    };

    // variable to access useDispatch from
    // react redux module for use in sending
    // information to the saga
    const dispatch = useDispatch();

    // variables to access and hold data
    // from the root reducer store
    const profileInfo = useSelector(store => store.profile.profileInfoReducer);
    const profilePicUrl = useSelector(store => store.profile.profilePictureReducer);
    const userInfo = useSelector(store => store.user)

    // getting user id from the store to send 
    // with uploaded photo
    const userId = userInfo.id;

    const allParams = useParams();
    const profileUserName = allParams.username;
    const profilePicture = allParams.profile_picture_medium;

    // hooks for image actions
    const [preview, setPreview] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [resizedFile, setResizedFile] = useState('');

    // asynchronous function that
    // updates hooks from user inputted information
    const onFileChange = async (event) => {
        console.log('profileusername', profileUserName);
        console.log(event);
        const userFile = event.target.files[0];
        // const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
        // if (acceptedImageTypes.includes(acceptedImageTypes.type)) {
        const copyFile = new Blob([userFile], { type: userFile.type });
        const resizedFile = await readAndCompressImage(copyFile, imageConfig);
        setSelectedFile(userFile);
        setResizedFile(resizedFile);
        setPreview(URL.createObjectURL(resizedFile));
        // } 
        // else {
        //     alert('Invalid image file type. Must be gif, jpeg or png.');
        // }
    }

    // send information from hooks to saga function
    const sendFormDataToServer = () => {
        let action;
        // The file name seems to be dropped on resize, send both the
        // original and resized files.
        action = {
            type: 'UPLOAD_PHOTO',
            payload: {
                // any other form data...
                selectedFile,
                resizedFile,
                userId,
            }
        };
        dispatch(action);
    }

    // const postPhoto = () => {
    //     let action;
    //     action = {
    //         type: 'POST_PHOTO',
    //         payload: selectedFile,
    //     }
    //     dispatch(action);
    // }

    // gets the user information from the reducer
    // on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_PROFILE_INFO' });
      }, []);

    return (
        <>
            {preview && (
                <img
                    className="placeholder-photo-preview"
                    src={preview}
                    alt="Photo preview"
                />
            )}
            <input type="file" accept="image/*" onChange={onFileChange} />
            <button onClick={event => sendFormDataToServer()}>Submit</button>
            <p>Profile img url</p>
             <p>{JSON.stringify(profilePicUrl)}</p><hr />
             <p>profile info</p>
            {JSON.stringify(profileInfo)} <br /> <hr />
            <p>user params</p>
            <p>
            {JSON.stringify(profileUserName)}
            </p>
            {/* <img src= {profilePicUrl[0].profile_picture_medium}></img> */}
            {/* <h1>{profileUserName}</h1> */}
            {profileInfo.map((user) =>
                    <div key={user.id}>
                        <p>username: {user.username}</p>
                        <img src= {user.profile_picture_medium}></img>
                    </div>
                )}
                <img src={profilePicUrl.profile_picture_thumb} />
                {/* <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"></img> */}
        </>

    );
}

export default ProfilePage;