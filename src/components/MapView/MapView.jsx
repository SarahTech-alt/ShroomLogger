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
  lat: 44.959382006981784,
  lng: -93.27825928801052
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
                onClick={toggleInfo}
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