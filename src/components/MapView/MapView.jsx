import React, { useEffect, useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import MapDetails from './MapDetails.jsx';
import Box from '@mui/material/Box';
import axios from "axios";


function MapView() {
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

  const logInfo = useReduxStore(store => store.logInfo);
  const logHistory = logInfo.logHistory.logHistory;
  const dispatch = useDispatch();
  const history = useHistory();
  // hook for accessing current location
  const [currentLocation, setCurrentLocation] = useState(null);
  // Coordinates to use to establish map center on load

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)

          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        }
      )
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);


  // On page load get the logs from the database
  useEffect(() => {
    dispatch({ type: 'FETCH_LOGS' })
    // on page load get current location from GoogleMaps
    // and set response to current location
    // dispatch({type:'fetchLocation'})
  }, []);

  // Calculate the center the map 
  // from the average
  // of historical latitudes and longitudes

  const averageLat = () => {
    let latSum = 0;
    let latCount = 0;
    for (let i = 0; i < logHistory.length; i++) {
      latSum += parseFloat(logHistory[i].latitude);
      latCount++;
    }
    return latSum / latCount;
  }

  const averageLng = () => {
    let lngSum = 0;
    let lngCount = 0;
    for (let i = 0; i < logHistory.length; i++) {
      lngSum += parseFloat(logHistory[i].longitude);
      lngCount++;
    }
    return lngSum / lngCount;
  }
  const [allLatitudes, setAllLatitudes] = useState([]);
  const [allLongitudes, setAllLongitudes] = useState([]);

  for (let i = 0; i < logHistory.length; i++) {
    allLatitudes.push(parseInt(logHistory[i].latitude));
    allLongitudes.push(parseInt(logHistory[i].longitude));
  };

  const historicalCenter = {
    lat: averageLat(allLatitudes),
    lng: averageLng(allLongitudes)
  }

  const containerStyle = {
    width: '350px',
    height: '400px'
  };


  return (
    <>
      <div className="container">

        <Box sx={{ mx: "auto", height: 350, width: 350 }}>
          <div className='map-display'>
            {isLoaded ? (
              <>
                {!logHistory.length && (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentLocation}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                  ></GoogleMap>
                )}
                {/* Map that will display markers */}
                {logHistory.length && (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={historicalCenter}
                    zoom={8}
                  >
                    <>
                      {/* Map all the log details into MapDetails component */}
                      {logHistory.map((coord, index) => (
                        <MapDetails coord={coord}
                          key={index}
                          averageCenter={true}
                          center={historicalCenter} />
                      ))}

                    </>
                  </GoogleMap>
                )}
              </>
            ) : (
              <div>Loading...</div>)}
          </div>
        </Box>
      </div>
    </>
  )
}

export default MapView