import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';

function LogDetails() {
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
    // access selected mushroom photo from store
    // const selectedPhoto = mushroomPhotos.selectedMushroomPicture;
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
        width: '400px',
        height: '400px'
      };
    // Google Maps data about each marker
    const onLoad = marker => {
        console.log('marker: ', marker)
    }
    // on page load dispatch to selected log saga
    // send logId that was retried with useParams
    useEffect(() => {
        dispatch({ type: 'SET_SELECTED_LOG', payload: logId });
        console.log('id to send to photo router in component', logId)
        dispatch({ type: 'SET_SELECTED_MUSHROOM_PHOTO', payload: logId })
    }, [logId]);

    return (
        <>
            {/* {JSON.stringify(mushroomPhotos)} */}
            {JSON.stringify(selectedLog)}
            {/* Access information from the logDetail
            reducer and display on DOM 
            with a back button to navigate to previous page */}
            <h1>View Details</h1>
            <button
                onClick={event => deleteLog()}>
                Edit
            </button>
            <p> Common Name: {selectedLog.common_name}</p>
            <p> Scientific Name: {selectedLog.scientific_name}</p>
            <p> Date of Entry: {moment(selectedLog.date).format('LL')} </p>
            <p> Description: {selectedLog.details} </p>
            <img src={selectedLog.mushroom_picture_medium} alt={selectedLog.mushroom_picture_medium}/><br /><br />
                <div className='map-display'>
                    {/* {JSON.stringify(logDetails)} */}
                    {/* Initialize API */}
                    <LoadScript
                        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                    >
                        {/* Map that will display markers */}
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                        >
                            <Marker
                                position={center}
                                onLoad={onLoad}
                            >
                            </Marker>
                        </GoogleMap>
                    </LoadScript>
                </div>
                <button onClick={event => history.goBack()}>back</button>
            </>
            )
}


            export default LogDetails;