import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';

function EditMap({ selectedLog }) {

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
                {isLoaded && (
                    <>
                        {/* {JSON.stringify(locationToSend)} */}
                        {/* Map with event listener */}
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                            onClick={event => getClickData(event.latLng)}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            {/* Marker shows current location  */}
                            {showCurrentLocation && (
                                <Marker
                                    position={currentLocation}
                                    clickable={true}
                                    draggable={true}
                                ></Marker>
                            )}
                            {/* On map click display marker at click location */}
                            {displayNewMarker && (
                                <Marker
                                    position={locationToSend}
                                ></Marker>
                            )}
                        </GoogleMap>
                    </>
                )}
            </div>
        </>
    );
}

export default EditMap;