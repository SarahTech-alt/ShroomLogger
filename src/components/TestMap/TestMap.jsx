import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from '@googlemaps/react-wrapper';

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
function MyMapComponent({ center, zoom }) {
    const ref = useRef(null);
    const [map, setMap] = useState(null)
    const [markers, setMarkers] = useState(null)

    useEffect(() => {
        // we need to save google-map object for adding markers and routes in future
        if (ref.current) {
            // here will connect map frame to div element in DOM by using ref hook
            let createdMap = new window.google.maps.Map(
                ref.current,
                {
                    center,
                    zoom
                }
            );
            setMap(createdMap)
        }
    }, [center, zoom]);

    useEffect(() => {
        // we need to save google-map object for adding markers and routes in future
        if (map) {
            // here will connect map frame to div element in DOM by using ref hook
            let createdMarkers = new window.google.maps.Marker({
                position: center,
                map: map
            });
            setMarkers(createdMarkers)
        }
    }, [map, center]);

    // map will be connect to this div block
    return <div ref={ref} id="map" />;
}

export default MyMapWrapper;