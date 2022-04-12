import React, { useEffect, useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import MapDetails from './MapDetails.jsx';
import Box from '@mui/material/Box';
import axios from "axios";
import MyMapWrapper from '../TestMap/TestMap'

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
    dispatch({ type: 'FETCH_LOGS' })
    // on page load get current location from GoogleMaps
    // and set response to current location
    axios.post(`api/map`)
      .then(res => {
        setCurrentLocation(res.data.location)
      })
      .catch(
        error => {
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
        <MyMapWrapper center={center} />
      </div>
    </>
  )
}

export default React.memo(MapView)