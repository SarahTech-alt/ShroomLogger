import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';
import RenderMap from '../Maps/RenderMap.jsx';

function EditMap({ selectedLog }) {

    const containerStyle = {
        width: '300px',
        height: '350px'
    };

    const markerLat = Number(selectedLog.latitude);
    const markerLng = Number(selectedLog.longitude);

    const center = {
        lat: markerLat,
        lng: markerLng
    };
    const [locationToSend, setLocationToSend] = useState({
        lat: markerLat,
        lng: markerLng
    })
    // hook for accessing current log location
    const [currentLocation, setCurrentLocation] = useState({
        lat: markerLat,
        lng: markerLng
    });
    // toggle which marker to show on rendered map
    const [displayNewMarker, setDisplayNewMarker] = useState(false);
    const [showCurrentLocation, setShowCurrentLocation] = useState(true);

    // function to get coordinates of map click
    // set the location to send variable
    // to the new coordinates
    const getClickData = (value) => {
        console.log(value)
        setLocationToSend({
            lat: value.lat(),
            lng: value.lng()
        })
        selectedLog.latitude = value.lat();
        selectedLog.longitude = value.lng();
        // change to show new marker 
        // and hide the current location marker
        setShowCurrentLocation(!showCurrentLocation);
        setDisplayNewMarker(!displayNewMarker);
    }

    return (
        <>
            <div>
                {/* Load Google Maps Script */}
                {/* {JSON.stringify(locationToSend)} */}
                {/* Map with event listener */}
                {/* Marker shows current location  */}
                {showCurrentLocation && (
                    <RenderMap marker={currentLocation} center={currentLocation} zoom={10} />
                )}
                {JSON.stringify(currentLocation)}
                {/* On map click display marker at click location */}
                {/* {displayNewMarker && (
                    <Marker
                        position={locationToSend}
                    ></Marker>
                )} */}
            </div>
        </>
    );
}

export default EditMap;