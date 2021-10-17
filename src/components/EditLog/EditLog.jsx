import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './EditLog.css';
import { readAndCompressImage } from 'browser-image-resizer';

function EditLog() {

    const imageConfig = {
        quality: 1.0,
        maxHeight: 300,
    };

    // hooks for image actions
    const [preview, setPreview] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [resizedFile, setResizedFile] = useState('');
    const [changePicture, setChangePicture] = useState(false);

    // matches parameters of current route
    const allParams = useParams();
    // selects the id from the parameters
    const logId = allParams.id;
    // select the logDetail from the combined logHistory reducer

    const logInfo = useSelector(store => store.logHistory);
    const selectedLog = logInfo.logDetail;
    // access the logHistory reducer from the store
    const userInfo = useSelector(store => store.user)
    // getting user id from the store to send 
    // with uploaded photo
    const userId = userInfo.id;

    // variable for dispatching actions to sagas
    const dispatch = useDispatch();
    // variable for navigation purposes
    const history = useHistory();

    // on page load dispatch to selected log saga
    // send logId that was retried with useParams
    useEffect(() => {
        dispatch({ type: 'SET_SELECTED_LOG', payload: logId });
        console.log('log id on page load', logId);
    }, [logId]);

    // dispatches to delete saga on delete button click
    const deleteLog = () => {
        dispatch({ type: 'DELETE_SELECTED_LOG', payload: logId })
    }

    const [updatedMushroom, setUpdatedMushroom] = useState({
        common_name: '',
        scientific_name: '',
        latitude: '',
        longitude: '',
        date: '',
        details: '',
        mushroom_picture_url: '',
    });

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
    }

    const sendFormDataToServer = () => {
        // The file name seems to be dropped on resize, send both the
        // original and resized files.
        const action = {
            type: 'EDIT_LOG_DETAILS',
            payload: {
                // any other form data...
                logId,
                updatedMushroom
            }
        };
        dispatch(action);
        sendPictureToServer();
    }

    const sendPictureToServer = () => {
        console.log('in send picture to server on edit page');
        let action;
        action = {
            type: 'EDIT_LOG_PICTURE',
            payload: {
                selectedFile,
                resizedFile,
                logId
            }
        }
        setPreview('');
        setChangePicture(!changePicture);
    }

    return (
        <>
            {JSON.stringify(logInfo.logDetail)}<hr />
            {/* Access information from the logDetail
            reducer and display on DOM with buttons to edit logs
            and a back button to navigate to previous page */}
            <h1>Edit Page</h1>
            <button onClick={event => deleteLog()}>delete log </button>
            <br /><br />
            <input
                type="text"
                onChange={event => setUpdatedMushroom({ ...updatedMushroom, common_name: event.target.value })}
                placeholder={selectedLog.common_name}
            />
            <br />
            <input
                type="text"
                onChange={event => setUpdatedMushroom({ ...updatedMushroom, scientific_name: event.target.value })}
                placeholder={selectedLog.scientific_name}
            />
            <br />
            <input
                type="text"
                onChange={event => setUpdatedMushroom({ ...updatedMushroom, details: event.target.value })} placeholder={selectedLog.details} /><br />
            <input
                type="date"
                onChange={event => setUpdatedMushroom({ ...updatedMushroom, date: event.target.value })}
                onfocus={selectedLog.date}
            /><br />
            <img
                src={selectedLog.mushroom_picture_url}
                alt={selectedLog.mushroom_picture_url}
                onClick={(event => setChangePicture(!changePicture))}
            />
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
                </div>
            )}

            <br /> <br />
            <button onClick={event => sendFormDataToServer()}>Submit</button>
            <br /><br />

            {/* <button onClick={event => setEditThing(!editThing)}>Edit</button> */}
            <button onClick={event => history.goBack()}>back</button>
        </>
    );
}

export default EditLog;