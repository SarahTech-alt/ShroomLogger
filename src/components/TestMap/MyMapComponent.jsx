import React, { useEffect, useRef } from "react";
import { Wrapper } from '@googlemaps/react-wrapper';

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

export default MyMapComponent;