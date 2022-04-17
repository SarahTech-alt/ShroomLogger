import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

function MapComponent({ center, zoom, logHistory, marker, editable }) {
    const ref = useRef(null);
    const [map, setMap] = useState(null)
    const [clicks, setClicks] = useState([]);
    const [markerLocation, setMarkerLocation] = useState(marker);
    const [hidePreviousMarker, setHidePreviousMarker] = useState(false);
    const [mapCenter, setMapCenter] = useState(center);
    const dispatch = useDispatch();

    const mapMarker = new window.google.maps.Marker({
        position: markerLocation,
        map: map,
        title: 'Hello World!'
    });


    const onClick = (e) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng]);
        setMarkerLocation(e.latLng);
        setHidePreviousMarker(true);
        setMapCenter(e.latLng);
        { mapMarker }
        dispatch({ type: 'SET_NEW_LOCATION_TO_SEND', payload: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
    }

    const onIdle = (m) => {
    };

    useEffect(() => {
        if (map && logHistory) {
            // here we will add markers to map
            for (let i = 0; i < logHistory.length; i++) {
                const markers = {
                    lat: Number(logHistory[i].latitude),
                    lng: Number(logHistory[i].longitude)
                }
                new window.google.maps.Marker({
                    position: markers,
                    map,
                    title: logHistory[i].common_name,

                });
            }
        }
        if (map && !hidePreviousMarker) {
            // here we will add markers to map
            { mapMarker }
        }
    }, [map, hidePreviousMarker, logHistory]);

    React.useEffect(() => {
        if (map && editable) {

            ["click", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );
            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    useEffect(() => {
        // we need to save google-map object for adding markers and routes in future
        if (ref.current) {
            // here will connect map frame to div element in DOM by using ref hook
            let createdMap = new window.google.maps.Map(
                ref.current,
                {
                    center: mapCenter,
                    zoom,
                }
            );
            setMap(createdMap)
        }
    }, [center, zoom, clicks, logHistory]);

    return <div ref={ref} id="map" />;
}


export default MapComponent;