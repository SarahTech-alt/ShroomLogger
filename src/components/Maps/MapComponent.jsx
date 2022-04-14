import React, { useEffect, useRef, useState } from "react";

function MapComponent({ center, zoom, logHistory, marker }) {
    const ref = useRef(null);
    const [map, setMap] = useState(null)
    const [clicks, setClicks] = useState([]);

    const onClick = (e) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng]);
        new window.google.maps.Marker({
            position: e.latLng,
            map,

        });
    };

    const onIdle = (m) => {
    };

    useEffect(() => {
        if (map && logHistory) {
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
        if (map && marker) {
            // here we will add markers to map
            const markerLocation = {
                lat: Number(marker.lat),
                lng: Number(marker.lng)
            }
            new window.google.maps.Marker({
                position: markerLocation,
                map,
            });
        }
    }, [map]);

    React.useEffect(() => {
        if (map) {
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