import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddPhotos from './AddPhotos';
import MyMapWrapper from '../TestMap/TestMap';
import AddType from './AddType';
import AddDescription from './AddDescription';
import axios from 'axios';
import { Button } from '@mui/material';
import AddLocation from './AddLocation';
import AddDate from './AddDate';


function AddLogScreen() {
    const [mapCenter, setMapCenter] = useState({});
    const history = useHistory();

    useEffect(() => {
        axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
            .then(res => {
                setMapCenter({ lat: Number(res.data.location.lat), lng: Number(res.data.location.lng) })

            })
            .catch(
                error => {
                }
            )
        // dispatch({type:'fetchLocation'})
    }, []);

    // use current location as map center
    const center = {
        lat: Number(mapCenter.lat),
        lng: Number(mapCenter.lng)
    }

    const validateForm = () => {
        if (newMushroom.common_name === '') {
            alert('Please enter a type');
        }
        else {
            history.push('/summary')
        }
    }

    const newMushroom = useSelector(store => store.logHistory.logToAdd);



    return (
        <div id="container" className="add-screen">
            <AddPhotos />
            {/* <MyMapWrapper className='map' center={center} /> */}
            <AddLocation center={mapCenter} />
            <AddDate /><br />
            <AddType />
            <AddDescription /><br />
            <Button onClick={validateForm}>Submit</Button>
        </div>

    );
}

export default AddLogScreen;