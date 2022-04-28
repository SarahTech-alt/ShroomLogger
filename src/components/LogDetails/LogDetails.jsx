import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Box from '@mui/material/Box';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function LogDetails() {
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
    const profile = useSelector(store => store.user);
    // matches parameters of current route
    const allParams = useParams();
    // selects the id from the parameters
    const logId = allParams.id;
    // access the logHistory reducer from the store
    const logInfo = useSelector(store => store.logHistory);
    // select the logDetail from the combined logHistory reducer
    const selectedLog = logInfo.logDetail;
    // access mushroom photos
    const mushroomPhotos = useSelector(store => store.mushroomPhotos);
    // variable for dispatching actions to sagas
    const dispatch = useDispatch();
    // variable for navigation purposes
    const history = useHistory();
    // Coordinates to use to establish map center on load
    const markerLat = Number(selectedLog.latitude);
    const markerLng = Number(selectedLog.longitude)
    const center = {
        lat: markerLat,
        lng: markerLng
    };
    const containerStyle = {
        width: '300px',
        height: '300px'
    };


    // dispatch selected id to sagas and
    // direct user to edit page
    const editLog = (logId) => {
        history.push(`/edit/${logId}`);
    }

    // on page load dispatch to selected log saga
    // send logId that was retried with useParams
    useEffect(() => {
        dispatch({ type: 'SET_SELECTED_LOG', payload: logId });
        dispatch({ type: 'SET_SELECTED_MUSHROOM_PHOTO', payload: logId })
        window.scrollTo(0, 0)
    }, [logId]);

    return (
        <>
            <div className='edit-button'>
                <ModeEditOutlineOutlinedIcon onClick={event => editLog(selectedLog.id)} />
            </div>
            <div className="log-summary">

                <p> Common Name: {selectedLog.common_name}</p>
                <p> Scientific Name: {selectedLog.scientific_name}</p>
                <p> Date of Entry: {moment(selectedLog.date).format('LL')} </p>
                <p> Description: {selectedLog.details} </p>
                <img src={selectedLog.mushroom_picture_medium} alt={selectedLog.mushroom_picture_medium} /><br /><br />
                <div className='map-display'>
                    {/* {JSON.stringify(logDetails)} */}
                    {/* Map that will display markers */}
                    {isLoaded &&
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            <Marker
                                position={center}
                            >
                            </Marker>
                        </GoogleMap>
                    }
                </div><br />
                <Stack spacing={1} direction="row">
                    <Button variant="outlined"
                        style={{ color: '#615246', borderColor: '#080706' }}
                        onClick={event => history.goBack()}>
                        Go Back
                    </Button>
                </Stack>
            </div>
        </>
    );
}


export default LogDetails;