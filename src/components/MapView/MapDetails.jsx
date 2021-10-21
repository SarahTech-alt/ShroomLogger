import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
function MapDetails({ coord, key }) {
    const onLoad = marker => {
        console.log('marker: ', marker)
      }
      const center = {
        lat: 44.84657181221935,
        lng: -92.79125855396293
      };
      const [detailsDisplayed, setDetailsDisplayed] = useState(false)

      const toggleInfo = (id) => {
        setDetailsDisplayed(!detailsDisplayed)
      }
    
      const viewDetails = (logId) => {
        dispatch({type: 'SET_SELECTED_LOG', payload: logId});
        history.push(`/details/${logId}`);
      }
    
    return (
        <Marker
            key={key}
            position={{ lat: Number(coord.latitude), lng: Number(coord.longitude) }}
            averageCenter={true}
            onLoad={onLoad}
            onClick={event => viewDetails(coord.log_id)}
            onMouseOver={event => toggleInfo(coord.log_id)}
            onMouseOut={event => toggleInfo(coord.log_id)}
        > {detailsDisplayed && (
            <InfoWindow
                position={{ lat: Number(coord.latitude), lng: Number(coord.longitude) }}>
                <p>{coord.common_name}</p>
            </InfoWindow>)}
        </Marker>
    );
}

export default MapDetails;