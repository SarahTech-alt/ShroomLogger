import React from "react";
import { Wrapper } from '@googlemaps/react-wrapper';
import MyMapComponent from "../TestMap/MyMapComponent";

function MyMapWrapper({ center }) {
    const zoom = 15;

    return (
        <>
            This is a map
            <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <MyMapComponent center={center} zoom={zoom} />
            </Wrapper>
            In between
        </>
    )
}


export default MyMapWrapper;
