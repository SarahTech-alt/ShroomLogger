import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import moment from 'moment';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function Summary() {

    const dispatch = useDispatch();
    const newMushroom = useSelector(store => store.logHistory.logToAdd);
    const history = useHistory();

    const addNewMushroom = () => {
        dispatch({
            type: 'ADD_NEW_MUSHROOM',
            payload:
                { newMushroom }
        })
        history.push('/home');
    };

    const markerLat = Number(newMushroom.latitude);
    const markerLng = Number(newMushroom.longitude)
    const center = {
        lat: markerLat,
        lng: markerLng
    };
    const containerStyle = {
        width: '300px',
        height: '350px'
    };
    // Google Maps data about each marker
    const onLoad = marker => {
        console.log('marker: ', marker)
    }


    return (
        <div className="container">
            <Box sx={{ mx: "auto", height: 'auto', width: 350 }}>
                {/* {JSON.stringify(newMushroom)} */}
                <p> Common Name: {newMushroom.common_name}</p>
                <p> Scientific Name: {newMushroom.scientific_name}</p>
                <p> Date of Entry: {moment(newMushroom.date).format('LL')} </p>
                <p> Description: {newMushroom.details} </p>
                <img src={`https://${process.env.REACT_APP_AWS_S3_BUCKET}.s3.${process.env.REACT_APP_AWS_S3_REGION}.amazonaws.com/photos/medium/${newMushroom.selectedFile}`} alt={newMushroom.common_name} /><br /><br />
                <div className='map-display'>
                    {/* Initialize API */}
                    <LoadScript
                        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                    >
                        {/* Map that will display markers */}
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={15}
                        >
                            <Marker
                                position={center}
                                onLoad={onLoad}
                            >
                            </Marker>
                        </GoogleMap>
                    </LoadScript>
                </div>
                <br />
                <Stack spacing={5} direction="row">
                    <Button
                        variant="outlined"
                        style={{ color: '#615246', borderColor: '#080706' }}
                        onClick={event => history.push('/home')}
                        sx={{ position: 'flex-start' }}>
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        style={{ color: '#615246', borderColor: '#080706' }}
                        onClick={event => addNewMushroom()}>
                        Submit
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}

export default Summary;