import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';





function LogDetails() {
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
        width: '300px',
        height: '300px'
      };
    // Google Maps data about each marker
    const onLoad = marker => {
        console.log('marker: ', marker)
    }

      // dispatch selected id to sagas and
    // direct user to edit page
    const editLog = (logId) => {
        console.log('id from details to send to edit',logId);
        history.push(`/edit/${logId}`);
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

<div className="container">
<img src='/mushroom.png' className="logo" />< br /><br /><br /><br /><br />
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  <Tabs>
    <Tab label="Home" onClick={event => history.push('/home')} />
    <Tab label="History" onClick={event => history.push('/history')} />
    <Tab label="Map"  onClick={event => history.push('/map')}/>
    <Tab label="Add New" onClick={event => history.push('/addPhotos')} />
  </Tabs>
</Box>
            {/* {JSON.stringify(mushroomPhotos)} */}
            {/* {JSON.stringify(selectedLog)} */}
            {/* Access information from the logDetail
            reducer and display on DOM 
            with a back button to navigate to previous page */}
            <h1>View Details
            <ModeEditOutlineOutlinedIcon sx={{ml:8, height:35, width:40}} onClick={event => editLog(selectedLog.id)} />
            </h1>
            
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
                <ArrowBackOutlinedIcon sx={{height:100, width:50}} onClick={event => history.goBack()} />
                </div>
            </>
            )
}


            export default LogDetails;