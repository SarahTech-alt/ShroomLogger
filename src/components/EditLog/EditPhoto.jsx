import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { readAndCompressImage } from 'browser-image-resizer';
import { useHistory } from 'react-router-dom';

function EditPhoto( { selectedLog, logId } ) {

    const dispatch = useDispatch();
    const history = useHistory();
    const imageConfig = {
        quality: 1.0,
        maxHeight: 300,
    };

    // hooks for image actions
    const [preview, setPreview] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [resizedFile, setResizedFile] = useState('');
    const [changePicture, setChangePicture] = useState(false);

    const onFileChange = async (event) => {
        console.log(event);
        const userFile = event.target.files[0];
        const copyFile = new Blob([userFile], { type: userFile.type });
        const resizedFile = await readAndCompressImage(copyFile, imageConfig);
        setSelectedFile(userFile);
        setResizedFile(resizedFile);
        setPreview(URL.createObjectURL(resizedFile));
        console.log(process.env.REACT_APP_AWS_S3_BUCKET);
        selectedLog.mushroom_picture_thumb = `https://solospikebucket.s3.us-east-2.amazonaws.com/photos/thumb/${userFile.name}`;
        selectedLog.mushroom_picture_medium = `https://solospikebucket.s3.us-east-2.amazonaws.com/photos/medium/${userFile.name}`;
    }

    const sendPictureToServer = () => {
        console.log('in send picture to server on edit page', selectedFile);
        dispatch({
            type: 'ADD_MUSHROOM_PHOTO',
            payload: {
                selectedFile,
                resizedFile,
                logId
            }
        })
        setPreview('');
        setChangePicture(!changePicture);
    }

    const editPicture = () => {
        setChangePicture(!changePicture);
    }

    return (
        <>
            <img src={selectedLog.mushroom_picture_medium}
            alt={selectedLog.common_name}
            onClick={event=>editPicture()} />
            {/* display preview of image once selected
        onFileChange sets the state of preview */}
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
                            <input type="file" accept="image/*" onChange={onFileChange} />
                            {/* Dispatches file to saga when the button is clicked */}
                            <button onClick={event => sendPictureToServer()}>Submit</button>
                        </div>
                    )}<br /><br />
        </>
    );
}

export default EditPhoto;