import React, { useEffect, useRef, useState, useDispatch } from "react";
import { Wrapper } from '@googlemaps/react-wrapper';
import MapComponent from '../Maps/MapComponent'


function RenderMap({ center, logHistory, zoom, marker }) {

    return (
        <>
            This is a map
            <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <MapComponent center={center} zoom={zoom} logHistory={logHistory} marker={marker} />

            </Wrapper>
            In between
        </>
    )
}

export default RenderMap;