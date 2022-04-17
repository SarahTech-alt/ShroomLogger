import React, { useEffect, useState } from 'react';
import RenderMap from '../Maps/RenderMap.jsx';
import { useDispatch } from 'react-redux';

function EditMap({ selectedLog }) {

    const markerLat = Number(selectedLog.latitude);
    const markerLng = Number(selectedLog.longitude);
    const dispatch = useDispatch();

    // hook for accessing current log location
    const currentLocation = {
        lat: markerLat,
        lng: markerLng
    };

    // set location to initial marker location
    useEffect(() => {
        dispatch({ type: 'SET_NEW_LOCATION_TO_SEND', payload: { location: currentLocation } });
    }, []);

    return (
        <>
            <div>
                <RenderMap marker={currentLocation} center={currentLocation} zoom={10} editable={true} logHistory={selectedLog} />
            </div>
        </>
    );
}

export default EditMap;