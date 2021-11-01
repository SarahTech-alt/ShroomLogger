import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readAndCompressImage } from 'browser-image-resizer';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



function ProfilePage() {

    const imageConfig = {
        quality: 1.0,
        maxHeight: 300,
    };

    // variables to access react 
    // modules for dispatching information to the saga
    // and user navigation
    const dispatch = useDispatch();
    const history = useHistory();

    // variables to access and hold data
    // from the root reducer store
    const profileInfo = useSelector(store => store.profile.profileInfoReducer);
    const userInfo = useSelector(store => store.user)
    const userId = userInfo.id;

    // hooks for image actions
    const [preview, setPreview] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [resizedFile, setResizedFile] = useState('');
    const [changePicture, setChangePicture] = useState(false);
    const [showCurrentPhoto, setShowCurrentPhoto] = useState(true);

    // asynchronous function that
    // updates hooks from user inputted information
    const onFileChange = async (event) => {
        setShowCurrentPhoto(false);
        console.log(event);
        const userFile = event.target.files[0];
        const copyFile = new Blob([userFile], { type: userFile.type });
        const resizedFile = await readAndCompressImage(copyFile, imageConfig);
        setSelectedFile(userFile);
        setResizedFile(resizedFile);
        setPreview(URL.createObjectURL(resizedFile));
    }

    // send information from hooks to saga function
    const sendFormDataToServer = async () => {
        let action;
        // The file name seems to be dropped on resize, send both the
        // original and resized files.
        await dispatch({
            type: 'UPLOAD_PHOTO',
            payload: {
                // any other form data...
                selectedFile,
                resizedFile,
                userId,
            }
        });
        setPreview('');
        setChangePicture(!changePicture);
        setShowCurrentPhoto(!showCurrentPhoto);
    }

    // gets the user information from the reducer
    // on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_PROFILE_INFO' });
    }, []);

    return (
        <>
            <div className="container">
                <Box sx={{ mx: "auto", height: 'auto', width: 350 }}>
                    {preview && (
                        <img
                            className="placeholder-photo-preview"
                            src={preview}
                            alt="Photo preview"
                        />
                    )}
                    {/* Show file upload when the user clicks their profile picture
            Allows user to select a file from their local files */}
                    {changePicture && (
                        <div>
                            <input type="file" accept="image/*" onChange={onFileChange} /> <br />
                            {/* Dispatches file to saga when the button is clicked */}
                            <button onClick={event => sendFormDataToServer()}>Submit</button>
                        </div>
                    )}
                    {/* <p>{JSON.stringify(profileInfo)}</p> */}
                    {/* Map over the profileInfoReducer 
            to display username and profile image */}
                    {profileInfo.map((profile, index) =>
                        <div key={index}>
                            {/* When the user clicks their picture set change picture to true
                    which will conditionally render the file upload option */}
                            {showCurrentPhoto && (
                                <img src={profile.profile_picture_medium} onClick={(event => setChangePicture(!changePicture))}></img>
                            )}
                            <p>Username: {profile.username}</p>
                            <p>Member since: {moment(userInfo.date_created).format('LL')}</p>

                        </div>

                    )}

                    <Stack spacing={2} direction="row">
                        <Button variant="outlined"
                            style={{ color: '#615246', borderColor: '#080706' }}
                            onClick={() => dispatch({ type: 'LOGOUT' })}>
                            Log Out
                        </Button>

                    </Stack>
                </Box>


            </div>
        </>

    );
}

export default ProfilePage;