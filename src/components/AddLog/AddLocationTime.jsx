import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import moment from 'moment';

function AddLocationTime() {
    const history = useHistory();
    const [location, setLocation] = useState({});
    const dispatch = useDispatch();
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

    const newMushroom =  useSelector(store => store.logHistory.logToAdd);

    const center = {
        lat: location.lat,
        lng: location.lng
    }

    const containerStyle = {
        width: '400px',
        height: '400px'
    };



    return (
        <>
        {JSON.stringify(newMushroom)}<br/>
            <h1>In Add Location and Time</h1>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
                {JSON.stringify(location)}
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                </GoogleMap>
            </LoadScript>

            <input type="number" value={newMushroom.latitude} onChange={(event) => ({ ...newMushroom.latitude=event.target.value })} placeholder="Latitude"></input> <br />

            <input type="number" value={newMushroom.longitude} onChange={(event) => ({ ...newMushroom.longitude=event.target.value })} placeholder="Longitude"></input> <br />

            <input type="date" onChange={(event) => ({...newMushroom.date= moment(event.target.value).format() })} placeholder="When"></input> <br />

            <button onClick={event => history.push('/description')}>Next: Add Details</button>
          
        </>
    );
}

export default AddLocationTime;