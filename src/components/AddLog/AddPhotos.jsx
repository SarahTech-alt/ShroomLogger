import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readAndCompressImage } from 'browser-image-resizer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



function AddPhotos() {

    const imageConfig = {
        quality: 1.0,
        maxHeight: 300,
    };
    // hooks for image actions
    const [preview, setPreview] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [resizedFile, setResizedFile] = useState('');
    // access the logHistory reducer from the store
    const userInfo = useSelector(store => store.user);

    // getting user id from the store to send 
    // with uploaded photo
    const userId = userInfo.id;
    // use history for user navigation between pages
    const history = useHistory();
    // use to dispatch events to sagas
    const dispatch = useDispatch();
    const newMushroom = useSelector(store => store.logHistory.logToAdd);

    // select the logDetail from the combined logHistory reducer
    const logInfo = useSelector(store => store.logHistory);

    // asynchronous function that
    // updates hooks from user inputted information
    const onFileChange = async (event) => {
        const userFile = event.target.files[0];
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

    const addNewMushroomPhoto = () => {

        dispatch({
            type: 'ADD_MUSHROOM_PHOTO',
            payload: {
                // any other form data...
                selectedFile,
                resizedFile,

            }
        })
        history.push('/addType')
        newMushroom.selectedFile = selectedFile.name;
    }


    const sendInfoToRedux = () => {
        dispatch({ type: 'SET_LOG_TO_ADD', payload: newMushroom });
        history.push('/addType')
    }


    return (
        <>
            <div className="container">
                {/* Show file upload when the user clicks their profile picture
            Allows user to select a file from their local files */}
                <Box sx={{ mx: "auto", height: "auto", width: 350 }}>
                    <input type="file" accept="image/*" onChange={onFileChange} /><br />
                    {preview && (
                        <img
                            className="placeholder-photo-preview"
                            src={preview}
                            alt="Photo preview"
                        />
                    )} <br />
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined"
                            style={{ color: '#615246', borderColor: '#080706' }}
                            onClick={event => history.goBack()}>
                            Go Back
                        </Button>
                        <Button
                            variant="outlined"
                            style={{ color: '#615246', borderColor: '#080706' }}
                            onClick={event => { addNewMushroomPhoto() }}>
                            Next: Add Name
                        </Button>
                    </Stack>
                </Box>
            </div>
        </>
    );
}

export default AddPhotos;