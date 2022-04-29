import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';



function AddLocation() {
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
        }
    }, []);


    // use history from react for page navigation
    const history = useHistory();

    // toggle which marker to show on rendered map
    const [displayNewMarker, setDisplayNewMarker] = useState(false);
    const [showCurrentLocation, setShowCurrentLocation] = useState(true);

    // maps display configuration
    const containerStyle = {
        width: '350px',
        height: '400px'
    };


    useEffect(() => {
        // set marker to current location
        {
            center &&
                ({ ...newMushroom.latitude = center.lat, ...newMushroom.longitude = center.lng })
        }
    }, [])


    // access information about new log
    // from redux store
    const newMushroom = useSelector(store => store.logHistory.logToAdd);


    // function to get coordinates of map click
    // set the location to send variable
    // to the new coordinates
    const getClickData = (value) => {
        ({ ...newMushroom.latitude = value.lat(), ...newMushroom.longitude = value.lng() })
        setLocationToSend(
            { lat: value.lat(), lng: value.lng() }
        )
        // change to show new marker 
        // and hide the current location marker
        setShowCurrentLocation(false);
        setDisplayNewMarker(true);
    }

    return isLoaded ? (
        <div className="map">

            {/* Map with event listener */}

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onClick={event => getClickData(event.latLng)}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {/* Marker shows current location  */}
                {showCurrentLocation && (
                    <Marker
                        position={center}
                        clickable={true}
                        draggable={true}
                    ></Marker>
                )}
                {displayNewMarker && (
                    <Marker
                        position={locationToSend}
                        clickable={true}
                        draggable={true}
                    ></Marker>

                )}
            </GoogleMap>
        </div >
    ) : <div>Loading...</div>;
}

export default AddLocation;