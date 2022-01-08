import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useHistory } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import moment from 'moment';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { useDispatch, useSelector } from 'react-redux';

function TestMap() {

    const [currentLocation, setCurrentLocation] = useState({});
    const [locationToSend, setLocationToSend] = useState({});
    const center = {
        lat: currentLocation.lat,
        lng: currentLocation.lng
    }
    const containerStyle = {
        width: '350px',
        height: '400px'
    };

    const logHistory = useSelector(state => state.logHistory.logHistory);


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

    const dispatch = useDispatch();
    const log = useSelector(state => state.logHistory);

    useEffect(() => {
        axios.post(`api/map`)
            .then(res => {
                console.log(res);
                setCurrentLocation(res.data.location)
                setLocationToSend(res.data.location)
            })
            .catch(
                error => {
                    console.log('there was an error posting');
                }
            )
        dispatch({type:'FETCH_LOGS'});
    }, []);

    return(
<>
<h1>Hi!</h1>
    <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                >
                    {/* Marker shows current location  */}

                    <Marker
                        position={currentLocation}
                        clickable={true}
                        draggable={true}
                    ></Marker>

                    {/* On map click display marker at click location */}

            </GoogleMap>
        </LoadScript>

        <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={historicalCenter}
                zoom={10}
                >
                    {/* Marker shows current location  */}
        {log.logHistory.map ((coord) => (
                    <Marker
                    position={{ lat: Number(coord.latitude), lng: Number(coord.longitude) }}
                        clickable={true}
                        draggable={true}
                    ></Marker>
        ))}

                    {/* On map click display marker at click location */}
        
            </GoogleMap>
        </LoadScript>
            {JSON.stringify({historicalCenter})}
         {JSON.stringify(log)}<br />
</>
    );
}

export default TestMap;


























// import React from 'react';
// import { GoogleMap, useLoadScript } from '@react-google-maps/api';
// import { useEffect } from 'react';





// // var bounds = new google.maps.LatLngBounds();
// // var infowindow = new google.maps.InfoWindow(); 
// // for (i = 0; i < locations.length; i++) {  
// //   var marker = new google.maps.Marker({
// //     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
// //     map: map
// //   });
// // }





// function TestMap() {


// const google = window.google;

// const containerStyle = {
//   width: '100vw',
//   height: '100vh',
// };

// const center = {
//   lat: 44.84657181221935,
//     lng: -92.79125855396293
// };

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   });

//   if (loadError) return 'Error loading maps';
//   if (!isLoaded) return 'Loading maps';

//   // useEffect(() => {
//   //   const script = document.createElement('script');
  
//   //   script.src = "http://maps.googleapis.com/maps/api/js?v=3&sensor=true";
//   //   script.async = true;
  
//   //   document.body.appendChild(script);
  
//   //   return () => {
//   //     document.body.removeChild(script);
//   //   }
//   // }, []);

//   return (
//     <div className="App">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={10}

//       ></GoogleMap>
//     </div>
//   );
// }

// export default TestMap;