import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddPhotos from './AddPhotos';
import AddType from './AddType';
import AddDescription from './AddDescription';
import { Button } from '@mui/material';
import AddLocation from './AddLocation';
import AddDate from './AddDate';
import mushroomPictureSaga from '../../redux/sagas/mushroom.picture.saga';


function AddLogScreen() {
    const [mapCenter, setMapCenter] = useState({});
    const history = useHistory();

    const newMushroom = useSelector(store => store.logHistory.logToAdd);
    const validateForm = () => {
        if (newMushroom.common_name === '') {
            alert('Please enter a type');
        }
        if (newMushroom.selectedFile === '') {
            newMushroom.selectedFile = 'default-photo.jpg'
        }
        history.push('/summary')
    }




    return (
        <div id="container" className="add-screen">
            <AddPhotos />
            <AddLocation />
            <AddDate /><br />
            <AddType />
            <AddDescription /><br />
            <Button onClick={validateForm}>Submit</Button>
        </div>

    );
}

export default AddLogScreen;