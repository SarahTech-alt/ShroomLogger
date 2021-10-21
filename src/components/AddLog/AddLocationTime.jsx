import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';

function AddLocationTime() {

    const [location, setLocation] = useState({});

    useEffect(() => {
        axios.post(`api/mushroom/map/`)
            .then(res => {
                console.log(res);
                setLocation(res.data.location)
            })
            .catch(
                error => {
                    console.log('there was an error posting');
                }
            )
    }, []);

    const center = {
        lat: location.lat,
        lng: location.lng
    }

    const containerStyle = {
        width: '400px',
        height: '400px'
      };



    return (
        <>
            <h1>In Add Location and Time</h1>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
                {JSON.stringify(location)}
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                </GoogleMap>
            </LoadScript>

        </>
    );
}

export default AddLocationTime;