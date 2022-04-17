import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RenderMap from '../Maps/RenderMap';


function Summary() {

    const dispatch = useDispatch();
    const newMushroom = useSelector(store => store.logHistory.logToAdd);
    const mushroomLocation = useSelector(store => store.locationToSend.locationToSend);
    const history = useHistory();

    const addNewMushroom = () => {
        dispatch({
            type: 'ADD_NEW_MUSHROOM',
            payload:
                { newMushroom }
        })
        history.push('/home');
    };

    const markerLat = Number(mushroomLocation.lat);
    const markerLng = Number(mushroomLocation.lng)
    const center = {
        lat: markerLat,
        lng: markerLng
    };


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
                    <RenderMap center={center} zoom={15} logHistory={newMushroom} marker={center} />
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