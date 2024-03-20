import { useState } from "react";
import "./App.css";
import GoogleMapComp from "./components/GoogleMapComp";
import GooglePlacesAPI from "./components/GooglePlacesAPI";

function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 28.7041,
    lng: 77.1025,
  });
  return (
    <div className="App">
      <GooglePlacesAPI setSelectedLocation={setSelectedLocation} />
      <GoogleMapComp selectedLocation={selectedLocation} />
    </div>
  );
}

export default App;

