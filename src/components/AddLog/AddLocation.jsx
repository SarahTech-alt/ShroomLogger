import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';



function AddLocation({ center }) {

    // use history from react for page navigation
    const history = useHistory();

    // toggle which marker to show on rendered map
    const [displayNewMarker, setDisplayNewMarker] = useState(false);
    const [showCurrentLocation, setShowCurrentLocation] = useState(true);
    const [currentLocation, setCurrentLocation] = useState(center)

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
    }, [center])


    // access information about new log
    // from redux store
    const newMushroom = useSelector(store => store.logHistory.logToAdd);

    const [locationToSend, setLocationToSend] = useState(currentLocation);

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

    return (
        <div className="map">
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
                {/* Map with event listener */}

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onClick={event => getClickData(event.latLng)}
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
            </LoadScript><br />
        </div >
    );
}

export default AddLocation;