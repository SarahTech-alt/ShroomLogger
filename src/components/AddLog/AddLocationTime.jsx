import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import moment from 'moment';

function AddLocationTime() {

    // use history from react for page navigation
    const history = useHistory();
    // hook for accessing current location
    const [currentLocation, setCurrentLocation] = useState({});
    // toggle which marker to show on rendered map
    const [displayNewMarker, setDisplayNewMarker] = useState(false);
    const [showCurrentLocation, setShowCurrentLocation] = useState(true);

    // use current location as map center
    const center = {
        lat: currentLocation.lat,
        lng: currentLocation.lng
    }
    // maps display configuration
    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const [locationToSend, setLocationToSend] = useState({
        lat: currentLocation.lat,
        lng: currentLocation.lng
    })


    // on page load get current location from GoogleMaps
    // and set response to current location
    useEffect(() => {
        axios.post(`api/mushroom/map/`)
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
    }, []);

    // access information about new log
    // from redux store
    const newMushroom = useSelector(store => store.logHistory.logToAdd);

    // on submit change latitude and longitude values
    // of newMushroom in redux store
    // and navigate user to description page
    const sendLocationData = () => {
        newMushroom.latitude = locationToSend.lat;
        newMushroom.longitude = locationToSend.lng;
        console.log(newMushroom);
        history.push('/description')
    }
   

    // function to get coordinates of map click
    // set the location to send variable
    // to the new coordinates
    const getClickData = (value) => {
        console.log(value.lat());
        console.log(value.lng());
        setLocationToSend({
            lat: value.lat(),
            lng: value.lng()
        })
        // change to show new marker 
        // and hide the current location marker
        setShowCurrentLocation(!showCurrentLocation);
        setDisplayNewMarker(!displayNewMarker);
    }

    return (
        <>
            {JSON.stringify(newMushroom)}<br />
            <h1>In Add Location and Time</h1>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
                {JSON.stringify(location)}
                {/* Map with event listener */}
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onClick={event => getClickData(event.latLng)}
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
            </LoadScript><br />
            <div className="nav-buttons">
                <input type="date" onChange={(event) => ({ ...newMushroom.date = moment(event.target.value).format() })} placeholder="When"></input> <br /><br />

                <button onClick={event => sendLocationData()}>Next: Add Details</button>
            </div>
        </>
    );
}

export default AddLocationTime;