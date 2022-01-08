import React, { useEffect, useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import MapDetails from './MapDetails.jsx';
import Box from '@mui/material/Box';

function MapView() {
  const logInfo = useReduxStore(store => store.logInfo);
  const logHistory = logInfo.logHistory.logHistory;
  const dispatch = useDispatch();
  const history = useHistory();


  // On page load get the logs from the database
  useEffect(() => {
    console.log('component did mount');
    dispatch({ type: 'FETCH_LOGS' })
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
      <div className="container">

        <Box sx={{ mx: "auto", height: 350, width: 350 }}>
          <div className='map-display'>
            {/* Initialize API */}
            <LoadScript
              googleMapsApiKey='AIzaSyA5kx2R22QebhjWgNDJLG5_xuFJAg-gcrM'
            >
              {/* Map that will display markers */}
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
                      averageCenter={true} />
                  ))}
                </>
              </GoogleMap>
            </LoadScript>
          </div>
        </Box>
      </div>
    </>
  )
}

export default React.memo(MapView)