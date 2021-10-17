import React, { useEffect } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';


const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 44.973792346502,
  lng: -93.00798830056591
};

const onLoad = marker => {
  console.log('marker: ', marker)
}


function MapView() {
  const logInfo = useReduxStore(store => store.logInfo);
  const logDetails = logInfo.logHistory.logHistory;
  const dispatch = useDispatch();
  const history = useHistory();

  const toggleInfo = () => {

  }

  useEffect(() => {
    console.log('component did mount');
    dispatch({ type: 'FETCH_LOGS' })
  }, [dispatch]);

  return (
    <div className='map-display'>
        {JSON.stringify(logDetails)}
      <LoadScript
        googleMapsApiKey='AIzaSyB2zvv_VwzdmVB3AUsArHOukWu5uau-ZaY'
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
                position={{ lat: coord.latitude, lng: coord.longitude }}
                onLoad={onLoad}
                onClick={toggleInfo}
              > 
                 {/* <InfoWindow
                  position={{ lat: coord.latitude, lng: coord.longitude }}>
                  <p>{coord.details}</p>
                </InfoWindow> :  */}
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