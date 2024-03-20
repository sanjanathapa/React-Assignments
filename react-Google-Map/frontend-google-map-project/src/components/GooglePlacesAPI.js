import React, { useEffect, useRef, useState } from "react";
let autoComplete;

// Defining function loadScript that dynamically loads the Google Maps JavaScript API script by appending
//a < script > tag to the < head > of the document.It ensures that the provided callback function is
// executed once the script is loaded.

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "completed") {
        script.onreadystatechange = null; //so that yeh script ek he baar run ho, baar baar na ho run
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const GooglePlacesAPI = ({ setSelectedLocation }) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef();

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleScriptLoad = (setQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
      //when the script gets load then we will get a google object
      types: ["(cities)"], //we can do or apply multiple filters in this object
      componentRestrictions: { country: "IN" },
    });
    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(setQuery);
    });
  };

  const handlePlaceSelect = async (setQuery) => {
    const addressObject = await autoComplete.getPlace(); //we'll get data whatever place is selected over here
    console.log("addressObject---------------------", addressObject);
    const query = addressObject.formatted_address;
    setQuery(query);
    console.log({ query });
    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };
    console.log(latLng);
    setSelectedLocation(latLng);
  };
  useEffect(() => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBd11i0UJG5W3XXDdhNXPIUVOeMYuke1pc&v=3.exp&libraries=places",
      () => {
        handleScriptLoad(setQuery, autoCompleteRef);
      }
    );
  }, []);
  return (
    <div>
      <lable>Type in your Places </lable>
      <input ref={autoCompleteRef} onChange={handleQuery} placeholder="Search Places..." value={query}></input>
    </div>
  );
};

export default GooglePlacesAPI;

// import React, { useEffect, useRef, useState } from "react";
// let autoComplete;
// const loadScript = (url, callback) => {
//   let script = document.createElement("script");
//   script.type = "text/javascript";

//   if (script.readyState) {
//     script.onreadystatechange = function () {
//       if (script.readyState === "loaded" || script.readyState === "complete") {
//         script.onreadystatechange = null;
//         callback();
//       }
//     };
//   } else {
//     script.onload = () => callback();
//   }
//   script.src = url;
//   document.getElementsByTagName("head")[0].appendChild(script);
// };
// const GooglePlacesAPI = ({ setSelectedLocation }) => {
//   const [query, setQuery] = useState();
//   const autoCompleteRef = useRef(null);

//   const handlePlaceSelect = (updateQuery) => {
//     const addressObject = autoComplete.getPlace();
//     const query = addressObject.formatted_address;
//     updateQuery(query);
//     console.log({ query });
//     const latLng = {
//       lat: addressObject?.geometry?.location?.lat(),
//       lng: addressObject?.geometry?.location?.lng(),
//     };
//     console.log(latLng);
//     setSelectedLocation(latLng);
//   };
//   const handleSriptLoad = (updateQuery, autoCompleteRef) => {
//     autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
//       // types:['(cities)'], this is the restriction only
//       componentRestrictions: { country: "IN" },
//     });
//     autoComplete.addListener("place_changed", () => {
//       handlePlaceSelect(updateQuery);
//     });
//   };
//   useEffect(() => {
//     loadScript(
//       `https://maps.googleapis.com/maps/api/js?key="AIzaSyBd11i0UJG5W3XXDdhNXPIUVOeMYuke1pc"&v=3.exp&libraries=places`,
//       () => handleSriptLoad(setQuery, autoCompleteRef)
//     );
//   }, []);
//   return (
//     <div className="main-container">
//       <div>
//         <label>Type in your suburb or postcode</label>
//       </div>
//       <input
//         style={{
//           margin: "16px",
//           width: "40vw",
//           height: "20px",
//           fontSize: "14px",
//           /* padding: 5px; */
//         }}
//         ref={autoCompleteRef}
//         placeholder="Search Places ..."
//         onChange={(e) => setQuery(e.target.value)}
//         value={query}
//       />
//     </div>
//   );
// };

// export default GooglePlacesAPI;
