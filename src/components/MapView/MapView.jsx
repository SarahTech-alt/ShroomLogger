import React, { useEffect, useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import MapDetails from './MapDetails.jsx';
import Box from '@mui/material/Box';
import axios from "axios";
import RenderMap from '../Maps/RenderMap.jsx';

function MapView() {
  const logInfo = useReduxStore(store => store.logInfo);
  const logHistory = logInfo.logHistory.logHistory;
  const dispatch = useDispatch();
  const locationInfo = useReduxStore(store => store.userLocation)
  const userLocation = locationInfo.userLocation.userLocation.location;

  // On page load get the logs from the database
  useEffect(() => {
    dispatch({ type: 'FETCH_LOGS' })
    dispatch({ type: 'GET_LOCATION' })
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

  const showAllMarkers = true;


  return (
    <>
      <div className="container">
        <RenderMap center={historicalCenter ? historicalCenter : userLocation} logHistory={logHistory} zoom={8} showAllMarkers={showAllMarkers} />
      </div>
    </>
  )
}

export default MapView;