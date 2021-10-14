import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readAndCompressImage } from 'browser-image-resizer';




function ProfilePage() {

    const imageConfig = {
        quality: 1.0,
        maxHeight: 300,
    };

    const profileInfo = useSelector(store => store.profile.profileInfoReducer);
    const profilePicUrl = useSelector(store => store.profile.profilePictureReducer);
    const userInfo = useSelector(store => store.user)
    const userId = userInfo.id;
    const [preview, setPreview] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const dispatch = useDispatch();
    const [resizedFile, setResizedFile] = useState('');

    const onFileChange = async (event) => {
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
            },
        };
        dispatch(action);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_PROFILE_INFO' });
      }, [dispatch]);

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
            {JSON.stringify(profilePicUrl)}
            {JSON.stringify(profileInfo)}
        </>

    );
}

export default ProfilePage;