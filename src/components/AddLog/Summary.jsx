import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import moment from 'moment';


function Summary() {

    const dispatch = useDispatch();
    const newMushroom =  useSelector(store => store.logHistory.logToAdd);
    const history=useHistory();

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
        width: '400px',
        height: '400px'
      };
    // Google Maps data about each marker
    const onLoad = marker => {
        console.log('marker: ', marker)
    }
  

    return (
        <>
        {JSON.stringify(newMushroom)}
        <p> Common Name: {newMushroom.common_name}</p>
            <p> Scientific Name: {newMushroom.scientific_name}</p>
            <p> Date of Entry: {moment(newMushroom.date).format('LL')} </p>
            <p> Description: {newMushroom.details} </p>
            <img src={`https://${process.env.REACT_APP_AWS_S3_BUCKET}.s3.${process.env.REACT_APP_AWS_S3_REGION}.amazonaws.com/photos/medium/${newMushroom.selectedFile}`} alt={newMushroom.common_name}/><br /><br />
                <div className='map-display'>
                    {/* {JSON.stringify(logDetails)} */}
                    {/* Initialize API */}
                    <LoadScript
                        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                    >
                        {/* Map that will display markers */}
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                        >
                            <Marker
                                position={center}
                                onLoad={onLoad}
                            >
                            </Marker>
                        </GoogleMap>
                    </LoadScript>
                </div>





     <button onClick={event => addNewMushroom()}>Add</button>

        </>
    );
}

export default Summary;