


























// import React from 'react';
// import { GoogleMap, useLoadScript } from '@react-google-maps/api';
// import { useEffect } from 'react';





// // var bounds = new google.maps.LatLngBounds();
// // var infowindow = new google.maps.InfoWindow(); 
// // for (i = 0; i < locations.length; i++) {  
// //   var marker = new google.maps.Marker({
// //     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
// //     map: map
// //   });
// // }





// function TestMap() {


// const google = window.google;

// const containerStyle = {
//   width: '100vw',
//   height: '100vh',
// };

// const center = {
//   lat: 44.84657181221935,
//     lng: -92.79125855396293
// };

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   });

//   if (loadError) return 'Error loading maps';
//   if (!isLoaded) return 'Loading maps';

//   // useEffect(() => {
//   //   const script = document.createElement('script');
  
//   //   script.src = "http://maps.googleapis.com/maps/api/js?v=3&sensor=true";
//   //   script.async = true;
  
//   //   document.body.appendChild(script);
  
//   //   return () => {
//   //     document.body.removeChild(script);
//   //   }
//   // }, []);

//   return (
//     <div className="App">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={10}

//       ></GoogleMap>
//     </div>
//   );
// }

// export default TestMap;