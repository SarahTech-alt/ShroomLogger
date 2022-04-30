import React, { useEffect, useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
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

  const [center, setCenter] = useState(null);
  const [locationToSend, setLocationToSend] = useState(center);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        }
      )
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      setCenter({
        lat: 46.7296,
        lng: 94.6859,
      })
    }
  }, []);

  // On page load get the logs from the database
  useEffect(() => {
    dispatch({ type: 'FETCH_LOGS' })
  }, []);

  const [selected, setSelected] = useState('');
  const [viewSorted, setViewSorted] = useState(false);

  const filterBy = (e) => {
    const sortedLogs = [];
    for (let i = 0; i < logHistory.length; i++) {
      if (logHistory[i].common_name === e.target.value) {
        sortedLogs.push(logHistory[i]);
      }
      setViewSorted(true);
      setSelected(sortedLogs)
    }
  }

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

  const averageSelectedLat = () => {
    let latSum = 0;
    let latCount = 0;
    for (let i = 0; i < selected.length; i++) {
      latSum += parseFloat(selected[i].latitude);
      latCount++;
    }
    return latSum / latCount;
  }

  const averageSelectedLng = () => {
    let lngSum = 0;
    let lngCount = 0;
    for (let i = 0; i < selected.length; i++) {
      lngSum += parseFloat(selected[i].longitude);
      lngCount++;
    }
    return lngSum / lngCount;
  }

  const [allLatitudes, setAllLatitudes] = useState([]);
  const [allLongitudes, setAllLongitudes] = useState([]);
  const [allSelectedLatitudes, setAllSelectedLatitudes] = useState([]);
  const [allSelectedLongitudes, setAllSelectedLongitudes] = useState([]);

  for (let i = 0; i < logHistory.length; i++) {
    allLatitudes.push(parseInt(logHistory[i].latitude));
    allLongitudes.push(parseInt(logHistory[i].longitude));
  };

  if (viewSorted) {
    for (let i = 0; i < selected.length; i++) {
      allSelectedLatitudes.push(parseInt(selected[i].latitude));
      allSelectedLongitudes.push(parseInt(selected[i].longitude));
    };
  }

  const historicalCenter = {
    lat: averageLat(allLatitudes),
    lng: averageLng(allLongitudes)
  }

  const selectedCenter = {
    lat: averageSelectedLat(selected),
    lng: averageSelectedLng(selected)
  }

  const containerStyle = {
    width: '350px',
    height: '400px'
  };

  const mushroomNames = [];
  for (let i = 0; i < logHistory.length; i++) {
    mushroomNames.push(logHistory[i].common_name);
  }

  const uniqueNames = Array.from(new Set(mushroomNames))


  return isLoaded ? (
    <>
      <div className="container">

        <Box sx={{ mx: "auto", height: 350, width: 350 }}>
          <>
            {mushroomNames.length ?
              <div><br />
                View History For: &nbsp;
                <select onChange={filterBy}>
                  {uniqueNames.map(log => (
                    <option key={log.id} value={log} >{log}</option>
                  ))}
                </select>
              </div> : ''}<br />
          </>
          <div className='map-display'>
            {/* Initialize API */}

            {!logHistory.length && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={8}
              ></GoogleMap>
            )}
            {/* Map that will display markers */}
            {logHistory.length && !viewSorted && (
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
            {selected.length && viewSorted && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={selectedCenter}
                zoom={8}
              >
                <>
                  {/* Map all the log details into MapDetails component */}
                  {selected.map((coord, index) => (
                    <MapDetails coord={coord}
                      key={index}
                      averageCenter={true}
                      center={selectedCenter} />
                  ))}

                </>
              </GoogleMap>
            )}
          </div>
        </Box>
      </div>
    </>
  ) : (<>Loading...</>)
}

export default MapView;