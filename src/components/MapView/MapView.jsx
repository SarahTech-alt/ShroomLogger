import React, { useEffect, useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import MapDetails from './MapDetails.jsx';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 44.84657181221935,
  lng: -92.79125855396293
};




function MapView() {
  const logInfo = useReduxStore(store => store.logInfo);
  const logDetails = logInfo.logHistory.logHistory;
  const dispatch = useDispatch();
  const history = useHistory();

  // let logDetails.push({detailDisplayed:false});

  // On page load get the logs from the database
  useEffect(() => {
    console.log('component did mount');
    dispatch({ type: 'FETCH_LOGS' })
  }, [dispatch]);

  return (
    <>
    <div><img className ="logo" src="/mushroom.png"/></div><br /><br/><br/><br></br>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs>
      <Tab label="Home" onClick={event => history.push('/home')} />
      <Tab label="History"  onClick={event => history.push('/history')}/>
      <Tab label="Add New" onClick={event => history.push('/addPhotos')} />
    </Tabs>
  </Box><br/>
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
         
          <>
          {/* Map all the log details into MapDetails component */}
            {logDetails.map((coord, index) => (
             <MapDetails coord={coord}
             key={index}/>
            ))}
          </>
        </GoogleMap>
      </LoadScript> <br />
    </div>
    </>
  )
}

export default React.memo(MapView)