import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import moment from 'moment';

function AddLocationTime() {

    // use history from react for page navigation
    const history = useHistory();
    // use dispatch to call saga functions
    const dispatch = useDispatch();
    // hook for accessing current location
    const [location, setLocation] = useState({});
    // use current location as map center
    const center = {
        lat: location.lat,
        lng: location.lng
    }
    // maps display configuration
    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const [displayNewMarker, setDisplayNewMarker] = useState(false);
    const [showCurrentLocation, setShowCurrentLocation] = useState(true);
    const [newMarkerLocation, setNewMakerLocation] = useState({
        lat: location.lat,
        lng: location.lng
    });


    // on page load get current location from GoogleMaps
    // and set response to current location
    useEffect(() => {
        axios.post(`api/mushroom/map/`)
            .then(res => {
                console.log(res);
                setLocation(res.data.location)
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



    // set redux store variables to 
    // current location on button click
    const sendCurrentLocation = () => {
        newMushroom.latitude = location.lat;
        newMushroom.longitude = location.lng;
        console.log(newMushroom);
    }

    const sendNewLocation = () => {
        newMushroom.latitude = newMarkerLocation.lat;
        newMushroom.longitude = newMarkerLocation.lng;
        console.log(newMushroom);
    }

    // function to get coordinates of map click
    const getClickData = (value) => {
        console.log(value.lat());
        console.log(value.lng());
        setNewMakerLocation({
            lat: value.lat(),
            lng: value.lng()
        })
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
                            position={center}
                            clickable={true}
                            draggable={true}
                        ></Marker>
                    )}
                    {/* On map click display marker at click location */}
                    {displayNewMarker && (
                        <Marker
                            position={newMarkerLocation}
                        ></Marker>
                    )}
                </GoogleMap>
            </LoadScript><br />
            <div className="nav-buttons">
                <button onClick={event => sendCurrentLocation()}>Use Current Location</button><br /><br />
                <button onClick={event => sendNewLocation()}>Use New Location</button><br /><br />
                <input type="date" onChange={(event) => ({ ...newMushroom.date = moment(event.target.value).format() })} placeholder="When"></input> <br /><br />

                <button onClick={event => history.push('/description')}>Next: Add Details</button>
            </div>
        </>
    );
}

export default AddLocationTime;