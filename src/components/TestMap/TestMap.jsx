import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';


const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 35.6804,
  lng: 139.769,
};



function TestMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  return (
    <div className="App">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}

      ></GoogleMap>
    </div>
  );
}

export default TestMap;