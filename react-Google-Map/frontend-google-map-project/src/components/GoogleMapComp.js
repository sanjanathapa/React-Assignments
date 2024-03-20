import React from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./googleMapComp.css";

const GoogleMapComp = ({ selectedLocation }) => {
  console.log("selectedLocation", selectedLocation);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBd11i0UJG5W3XXDdhNXPIUVOeMYuke1pc",
  });

  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []); //was static center. but now we need center to be dynamically set
  const mapRef = React.useRef();
  const onLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";

  return (
    <div style={{ width: "100%", height: "520px", paddingTop: "30px" }}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap mapContainerClassName="map-container" center={selectedLocation} zoom={13} onLoad={onLoad}>
          <MarkerF position={selectedLocation} />
        </GoogleMap>
      )}
    </div>
  );
};

export default GoogleMapComp;

// Rendering Google Map inside React application
//1. Rendering Google Map inside React application
//. useLoadScript: It loads the Google Maps API script.
//. GoogleMap: It is the main component inside which all the other map components render.

//2. Provide default props to the GoogleMap component
//. zoom: Sets the initial zoom level of the map
//. center: Sets a default center of the map
//. mapContainerClassName: CSS class name that specifies the height and width of the GoogleMap component

//Adding a default/custom marker on the Map
// 1. Default Marker
// Import Marker component from react-google-maps/api
// Provide position prop to this component which defines the position of the marker on the map

//to change the color(green, blue, pink, purple, yellow) of the defautl markeryou need to pass value to the optional icon prop of the Marker component
//Custom Marker: Another way is to create an object with your SVG path along with a few other configurations and pass it to the icon prop.
//e.g.
// const customMarker = {
//   path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
//   fillColor: "red",
//   fillOpacity: 2,
//   strokeWeight: 1,
//   rotation: 0,
//   scale: 1,
// };

//Dynamically setting a default view of the Map:
// To achieve this, you need to use the "onLoad" callback function on the GoogleMap component, which
// is called when the map instance has loaded and then set the map bounds based on the marker’s location.;
