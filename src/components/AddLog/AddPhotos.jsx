import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { readAndCompressImage } from 'browser-image-resizer';
import AddType from './AddType.jsx';
import AddLocationTime from './AddLocationTime.jsx';
import AddDescription from './AddDescription.jsx';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



function AddPhotos() {

    const imageConfig = {
        quality: 1.0,
        maxHeight: 300,
    };
     // hooks for image actions
     const [preview, setPreview] = useState('');
     const [selectedFile, setSelectedFile] = useState('');
     const [resizedFile, setResizedFile] = useState('');
     const [changePicture, setChangePicture] = useState(false);
         // access the logHistory reducer from the store
    const userInfo = useSelector(store => store.user);

    // getting user id from the store to send 
    // with uploaded photo
    const userId = userInfo.id;
    // use history for user navigation between pages
    const history = useHistory();
    // use to dispatch events to sagas
    const dispatch = useDispatch();
    const newMushroom =  useSelector(store => store.logHistory.logToAdd);

    // select the logDetail from the combined logHistory reducer
    const logInfo = useSelector(store => store.logHistory);
    // const selectedLog = logInfo.logDetail;
    // const userInfo = useSelector(store => store.user)
    // const userId = userInfo.id;

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
        newMushroom.selectedFile=selectedFile.name;
    }

 
    const sendInfoToRedux = () => {
        dispatch({type:'SET_LOG_TO_ADD', payload: newMushroom});
        history.push('/addType')
    }
 

    return (
        <>
                  <img src='/mushroom.png' className="logo" />< br /><br /><br /><br /><br />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  <Tabs>
  <Tab label="Home" onClick={event => history.push('/home')} />
    <Tab label="History" onClick={event => history.push('/history')} />
    <Tab label="Map"  onClick={event => history.push('/map')}/>
    <Tab label="Add New" sx={{ borderBottom: 1}} onClick={event => history.push('/addPhotos')} />
  </Tabs>
</Box><br />
            {/* Show file upload when the user clicks their profile picture
            Allows user to select a file from their local files */}
            <input type="file" accept="image/*" onChange={onFileChange} /><br />
            {preview && (
                <img
                    className="placeholder-photo-preview"
                    src={preview}
                    alt="Photo preview"
                />
            )} <br />
            
             <button onClick={event => history.goBack()}>Go Back</button>
            <button onClick={event => {addNewMushroomPhoto()}}>
                Next: Add Name
            </button>

           
           
        </>
    );
}

export default AddPhotos;