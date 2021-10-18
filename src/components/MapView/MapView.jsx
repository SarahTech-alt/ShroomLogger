import React, { useEffect, useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';


const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 44.84657181221935,
  lng: -92.79125855396293
};

const onLoad = marker => {
  console.log('marker: ', marker)
}


function MapView() {
  const logInfo = useReduxStore(store => store.logInfo);
  const logDetails = logInfo.logHistory.logHistory;
  const dispatch = useDispatch();
  const history = useHistory();

  const [detailsDisplayed, setDetailsDisplayed] = useState(false)

  const toggleInfo = (id) => {
    setDetailsDisplayed(!detailsDisplayed)
  }

  const viewDetails = (logId) => {
    dispatch({type: 'SET_SELECTED_LOG', payload: logId});
    history.push(`/details/${logId}`);
  }

  useEffect(() => {
    console.log('component did mount');
    dispatch({ type: 'FETCH_LOGS' })
  }, [dispatch]);

  return (
    <div className='map-display'>
        {/* {JSON.stringify(logDetails)} */}
      <LoadScript
        googleMapsApiKey='AIzaSyA5kx2R22QebhjWgNDJLG5_xuFJAg-gcrM'
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */}
          <>
            {logDetails.map((coord, index) => (
              <Marker key={index}
                position={{ lat: Number(coord.latitude), lng: Number(coord.longitude) }}
                onLoad={onLoad}
                onClick={event => viewDetails(coord.log_id)}
                onMouseOver={event => toggleInfo(coord.log_id)}
              > {detailsDisplayed && (
                 <InfoWindow
                  position={{ lat: Number(coord.latitude), lng: Number(coord.longitude) }}>
                  <p>{coord.common_name}</p>
                </InfoWindow>  )}
             </Marker>
            ))}
          </>
        </GoogleMap>
      </LoadScript> <br />
      <button onClick={event => history.goBack()}>Back</button>
    </div>
  )
}

export default React.memo(MapView)