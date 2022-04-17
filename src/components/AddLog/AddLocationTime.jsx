import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import useReduxStore from '../../hooks/useReduxStore';



function AddLocationTime() {
    const dispatch = useDispatch();
    // use history from react for page navigation
    const history = useHistory();
    // hook for accessing current location


    const userLocation = useSelector(store => store.userLocation);
    const markLocation = userLocation.userLocation.location;
    const markerLat = markLocation.lat;
    const markerLng = markLocation.lng;
    const center = {
        lat: markerLat,
        lng: markerLng
    };

    // const markerLat = Number(selectedLog.latitude);
    // const markerLng = Number(selectedLog.longitude);

    // // hook for accessing current log location
    // const currentLocation = {
    //     lat: markerLat,
    //     lng: markerLng
    // };

    useEffect(() => {
        dispatch({ type: 'SET_NEW_LOCATION_TO_SEND', payload: { lat: center.lat, lng: center.lng } });
    }, []);


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



    // access information about new log
    // from redux store
    const newMushroom = useSelector(store => store.logHistory.logToAdd);

    // on submit change latitude and longitude values
    // of newMushroom in redux store
    // and navigate user to description page
    const sendLocationData = () => {
        history.push('/description')
    }


    return (
        <div className="container">
            <Box sx={{ mx: "auto", height: 'auto', width: 350 }}>
                {/* {JSON.stringify(newMushroom)}<br /> */}
                <h1>Where And When</h1>
                {/* Map with event listener */}

                <RenderMap
                    center={center}
                    zoom={15}
                    marker={center}
                    editable={true}
                />

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