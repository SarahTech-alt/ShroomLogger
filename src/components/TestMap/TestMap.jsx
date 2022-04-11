import React, { useEffect, useRef } from "react";
import { Wrapper } from '@googlemaps/react-wrapper';

function MyMapWrapper() {
    const zoom = 8;
    const center = { lat: 44.96967, lng: -93.04448 };
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
function MyMapComponent({
    center,
    zoom,
}) {
    const ref = useRef();

    useEffect(() => {
        new window.google.maps.Map(ref.current, {
            center,
            zoom,
        });
    });

    return (
        <div ref={ref} id="map">Really, a map</div>);
}

export default MyMapWrapper;