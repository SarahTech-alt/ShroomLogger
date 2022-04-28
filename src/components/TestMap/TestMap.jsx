import React, { useEffect, useRef, useState, useDispatch } from "react";
import { Wrapper } from '@googlemaps/react-wrapper';

function TestMap() {
    return (
        <>
            This is a map
            <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <MapComponent />

            </Wrapper>
            In between
        </>
    )
}


function MapComponent() {
    const ref = useRef(null);
    const [map, setMap] = useState()
    const [center, setCenter] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                }
            )
        }
    }, []);

    useEffect(() => {
        // here will connect map frame to div element in DOM by using ref hook
        if (ref.current) {
            const map = new window.google.maps.Map(ref.current, {
                center: center,
                zoom: 15,
            });
            setMap(map);
        }
    }, [center]);

    return (
        <>
            <div ref={ref} id="map" />
        </>
    )
}


export default TestMap;