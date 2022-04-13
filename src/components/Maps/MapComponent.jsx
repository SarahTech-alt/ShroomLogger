import React, { useEffect, useRef, useState } from "react";

function MapComponent({ center, zoom, logHistory }) {
    const ref = useRef(null);
    const [map, setMap] = useState(null)


    useEffect(() => {
        if (map) {
            // here we will add markers to map
            for (let i = 0; i < logHistory.length; i++) {
                const markerLocation = {
                    lat: Number(logHistory[i].latitude),
                    lng: Number(logHistory[i].longitude)
                }
                new window.google.maps.Marker({
                    position: markerLocation,
                    map,
                    title: logHistory[i].common_name,

                });
            }
        }
    }, [map]);

    useEffect(() => {
        // we need to save google-map object for adding markers and routes in future
        if (ref.current) {
            // here will connect map frame to div element in DOM by using ref hook
            let createdMap = new window.google.maps.Map(
                ref.current,
                {
                    center,
                    zoom,
                }
            );
            setMap(createdMap)
        }
    }, [center, zoom]);

    return <div ref={ref} id="map" />;
}


export default MapComponent;