import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import moment from 'moment';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function Summary() {
    const [map, setMap] = useState(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    const dispatch = useDispatch();
    const newMushroom = useSelector(store => store.logHistory.logToAdd);
    const history = useHistory();
    const center = {
        lat: newMushroom.latitude,
        lng: newMushroom.longitude
    }

    const addNewMushroom = () => {
        dispatch({
            type: 'ADD_NEW_MUSHROOM',
            payload:
                { newMushroom }
        })
        history.push('/home');
    };

    const containerStyle = {
        width: '300px',
        height: '350px'
    };



    return (
        <div className="log-summary">
            <Box sx={{ mx: "auto", height: 'auto', width: 350 }}>
                {/* {JSON.stringify(newMushroom)} */}
                <p> Common Name: {newMushroom.common_name}</p>
                <p> Scientific Name: {newMushroom.scientific_name}</p>
                <p> Date of Entry: {moment(newMushroom.date).format('LL')} </p>
                <p> Description: {newMushroom.details} </p>
                {newMushroom.selectedFile ?
                    <img src={`https://${process.env.REACT_APP_AWS_S3_BUCKET}.s3.${process.env.REACT_APP_AWS_S3_REGION}.amazonaws.com/photos/medium/${newMushroom.selectedFile}`} alt={newMushroom.common_name} /> : <></>}<br /><br />

                <div className='map-display'>
                    {/* Map that will display markers */}
                    {center && (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={15}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            <Marker
                                position={center}
                            >
                            </Marker>
                        </GoogleMap>
                    )}
                </div>
                <br />
                <Stack spacing={5} direction="row">
                    <Button
                        variant="outlined"
                        style={{ color: '#615246', borderColor: '#080706' }}
                        onClick={event => history.push('/home')}
                        sx={{ position: 'flex-start' }}>
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        style={{ color: '#615246', borderColor: '#080706' }}
                        onClick={event => addNewMushroom()}>
                        Submit
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}

export default Summary;