import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { readAndCompressImage } from 'browser-image-resizer';


function AddPhotos() {

    const imageConfig = {
        quality: 1.0,
        maxHeight: 300,
    };
    // use history for user navigation between pages
    const history = useHistory();
    // use to dispatch events to sagas
    const dispatch = useDispatch();

    // select the logDetail from the combined logHistory reducer
    const logInfo = useSelector(store => store.logHistory);
    const selectedLog = logInfo.logDetail;
    const userInfo = useSelector(store => store.user)
    const userId = userInfo.id;

    // asynchronous function that
    // updates hooks from user inputted information
    const onFileChange = async (event) => {
        console.log(event);
        const userFile = event.target.files[0];
        // const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
        // if (acceptedImageTypes.includes(acceptedImageTypes.type)) {
        const copyFile = new Blob([userFile], { type: userFile.type });
        const resizedFile = await readAndCompressImage(copyFile, imageConfig);
        setSelectedFile(userFile);
        setResizedFile(resizedFile);

        // } 
        // else {
        //     alert('Invalid image file type. Must be gif, jpeg or png.');
        // }
    }

    // hooks for image actions

    const [selectedFile, setSelectedFile] = useState('');
    const [resizedFile, setResizedFile] = useState('');
    const [changePicture, setChangePicture] = useState(false);

    // hook for storing input data
    const [newMushroom, setNewMushroom] = useState({
        common_name: '',
        scientific_name: undefined,
        latitude: undefined,
        longitude: undefined,
        date: moment().format(),
        details: undefined,
    });
    // dispatch newMushroom info from inputs to loghistory.saga
    const addNewMushroom = () => {
        dispatch({
            type: 'ADD_MUSHROOM_PHOTO',
            payload: {
                // any other form data...
                selectedFile,
                resizedFile,
                userId,
            }
        })
        dispatch({
            type: 'ADD_NEW_MUSHROOM',
            payload:
                { newMushroom, selectedFile }
        })
        setChangePicture(!changePicture);
        history.push('/home');
    };

    return (
        <>
            {/* Show file upload when the user clicks their profile picture
            Allows user to select a file from their local files */}
            <input type="file" accept="image/*" onChange={onFileChange} /><br />

            {/* <p>picture upload placeholder</p> */}
            <input type="text" value={newMushroom.commonName} onChange={(event) => setNewMushroom({ ...newMushroom, common_name: event.target.value })} placeholder="Common Name"></input> <br />

            <input type="text" value={newMushroom.scientificName} onChange={(event) => setNewMushroom({ ...newMushroom, scientific_name: event.target.value })} placeholder="Scientific Name (optional)"></input><br />

            <input type="number" value={newMushroom.latitude} onChange={(event) => setNewMushroom({ ...newMushroom, latitude: event.target.value })} placeholder="Latitude"></input> <br />

            <input type="number" value={newMushroom.longitude} onChange={(event) => setNewMushroom({ ...newMushroom, longitude: event.target.value })} placeholder="Longitude"></input> <br />

            <input type="date" onChange={(event) => setNewMushroom({ ...newMushroom, date: moment(event.target.value).format() })} placeholder="When"></input> <br />

            <input type="text" value={newMushroom.details} onChange={(event) => setNewMushroom({ ...newMushroom, details: event.target.value })} placeholder="Details"></input> <br />

            <button onClick={event => history.goBack()}>Go Back</button>
            <button onClick={event => addNewMushroom()}>Add</button>
        </>
    );
}

export default AddPhotos;