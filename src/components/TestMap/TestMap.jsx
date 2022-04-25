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
    const [clicks, setClicks] = useState([]);
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // we need to save google-map object for adding markers and routes in future
        setLoading(true)
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
        return () => { (setLoading(false)) }
    }, []);

    useEffect(() => {
        // here will connect map frame to div element in DOM by using ref hook
        let createdMap = new window.google.maps.Map(
            ref.current,
            {
                center: center,
                zoom: 6,
            }
        );
        setMap(createdMap)
    }, [center]);

    return (
        <>
            Map
            <div ref={ref} id="map" />
        </>
    )
}


export default TestMap;