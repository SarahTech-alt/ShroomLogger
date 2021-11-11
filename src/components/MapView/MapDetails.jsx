import { InfoWindow, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function MapDetails({ coord, key }) {

  // Google Maps data about each marker
  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  const dispatch = useDispatch();
  const history = useHistory();

  // Coordinates to use to establish map center on load
  const center = {
    lat: 44.84657181221935,
    lng: -92.79125855396293
  };

  // Use to toggle info window
  const [detailsDisplayed, setDetailsDisplayed] = useState(false)

  // On marker click dispatch id to saga
  // to get details and direct user to details 
  // page of that log
  const viewDetails = (logId) => {
    dispatch({ type: 'SET_SELECTED_LOG', payload: logId });
    history.push(`/details/${logId}`);
  }

  return (
    // Markers from mapped data in MapView
    // Includes click events to view details
    // and mouse over event to show mushroom name
    <Marker
      key={key}
      position={{ lat: Number(coord.latitude), lng: Number(coord.longitude) }}
      averageCenter={true}
      onLoad={onLoad}
      onClick={event => setDetailsDisplayed(!detailsDisplayed)}
      onDblClick={event => viewDetails(coord.log_id)}
    > {detailsDisplayed && (
      <InfoWindow
        position={{ lat: Number(coord.latitude), lng: Number(coord.longitude) }}>
        <p>{coord.common_name}</p>
      </InfoWindow>)}
    </Marker>
  );
}

export default MapDetails;