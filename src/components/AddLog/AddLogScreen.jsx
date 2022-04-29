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

    // useEffect(() => {
    //     axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
    //         .then(res => {
    //             setMapCenter({ lat: Number(res.data.location.lat), lng: Number(res.data.location.lng) })

    //         })
    //         .catch(
    //             error => {
    //             }
    //         )
    //     // dispatch({type:'fetchLocation'})
    // }, []);

    // // use current location as map center
    // const center = {
    //     lat: Number(mapCenter.lat),
    //     lng: Number(mapCenter.lng)
    // }

    const newMushroom = useSelector(store => store.logHistory.logToAdd);
    const validateForm = () => {
        if (newMushroom.common_name === '') {
            alert('Please enter a type');
        }
        if (newMushroom.selectedFile === '') {
            // newMushroom.mushroom_picture_medium = "https://solospikebucket.s3.us-east-2.amazonaws.com/photos/medium/default-photo.jpg"
            // newMushroom.mushroom_picture_thumb = "https://solospikebucket.s3.us-east-2.amazonaws.com/photos/thumb/default-photo.jpg"
            newMushroom.selectedFile = 'default-photo.jpg'
        }
        history.push('/summary')
    }




    return (
        <div id="container" className="add-screen">
            <AddPhotos />
            {/* <MyMapWrapper className='map' center={center} /> */}
            <AddLocation />
            <AddDate /><br />
            <AddType />
            <AddDescription /><br />
            <Button onClick={validateForm}>Submit</Button>
        </div>

    );
}

export default AddLogScreen;