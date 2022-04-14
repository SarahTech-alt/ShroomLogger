import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import RenderMap from '../Maps/RenderMap';


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
        width: '350px',
        height: '400px'
    };

    const [locationToSend, setLocationToSend] = useState({
    })

    const [selectedDate, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [inputValue, setInputValue] = useState(moment().format("YYYY-MM-DD"));

    const onDateChange = (date, value) => {
        newMushroom.date = date;
        setDate(date);
        setInputValue(value);
    };

    const dateFormatter = str => {
        return str;
    };

    // on page load get current location from GoogleMaps
    // and set response to current location
    useEffect(() => {
        axios.post(`api/map`)
            .then(res => {
                setCurrentLocation(res.data.location)
                setLocationToSend(res.data.location)
            })
            .catch(
                error => {
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
        history.push('/description')
    }


    // function to get coordinates of map click
    // set the location to send variable
    // to the new coordinates
    const getClickData = (value) => {
        setLocationToSend({
            lat: value.lat(),
            lng: value.lng()
        })
        // change to show new marker 
        // and hide the current location marker
        setShowCurrentLocation(false);
        setDisplayNewMarker(true);
    }

    return (
        <div className="container">
            <Box sx={{ mx: "auto", height: 'auto', width: 350 }}>
                {/* {JSON.stringify(newMushroom)}<br /> */}
                <h1>Where And When</h1>
                {/* Map with event listener */}
                {showCurrentLocation && (
                    <RenderMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                        marker={currentLocation}
                    // onClick={event => getClickData(event.latLng)}
                    />
                )}
                <br />
                <div className="nav-buttons">
                    <Fragment>
                        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                            <KeyboardDatePicker
                                autoOk={true}
                                showTodayButton={true}
                                value={selectedDate}
                                format="YYYY-MM-DD" bo
                                inputValue={inputValue}
                                onChange={onDateChange}
                                rifmFormatter={dateFormatter}
                            />
                        </MuiPickersUtilsProvider>
                    </Fragment>
                    <br /><br />
                    <Stack spacing={1} direction="row">
                        <Button
                            variant="outlined"
                            style={{ color: '#615246', borderColor: '#080706' }}
                            onClick={event => sendLocationData()}>
                            Next: Add Details
                        </Button>
                    </Stack>
                </div>
            </Box>
        </div>
    );
}

export default AddLocationTime;