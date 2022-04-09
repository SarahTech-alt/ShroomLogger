import React, { useEffect, useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import MapDetails from './MapDetails.jsx';
import Box from '@mui/material/Box';
import axios from "axios";


function MapView() {
  const logInfo = useReduxStore(store => store.logInfo);
  const logHistory = logInfo.logHistory.logHistory;
  const dispatch = useDispatch();
  const history = useHistory();
  // hook for accessing current location
  const [currentLocation, setCurrentLocation] = useState({});
  // Coordinates to use to establish map center on load
  const center = {
    lat: currentLocation.lat,
    lng: currentLocation.lng
  }



  // On page load get the logs from the database
  useEffect(() => {
    console.log('component did mount');
    dispatch({ type: 'FETCH_LOGS' })
    // on page load get current location from GoogleMaps
    // and set response to current location
    axios.post(`api/map`)
      .then(res => {
        console.log(res);
        setCurrentLocation(res.data.location)
      })
      .catch(
        error => {
          console.log('there was an error posting');
        }
      )
    // dispatch({type:'fetchLocation'})
  }, [dispatch]);

  // Calculate the center the map 
  // from the average
  // of historical latitudes and longitudes

  const averageLat = () => {
    let latSum = 0;
    let latCount = 0;
    for (let i = 0; i < logHistory.length; i++) {
      latSum += parseFloat(logHistory[i].latitude);
      latCount++;
      console.log("average latitude sum", latSum);
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

      <Box sx={{ mx: "auto", height: 350, width: 350 }}>
        <div className='map-display'>
          {/* Initialize API */}
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          >

            {!logHistory.length && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={8}
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
          </LoadScript>
        </div>
      </Box>

    </>
  )
}

export default React.memo(MapView)