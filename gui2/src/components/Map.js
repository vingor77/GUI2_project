// Map.js

import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import MapContext from "../contexts/MapContext";

const Map = () => {
  const { mapData, setMapData } = useContext(MapContext);
  const center = useMemo(() => ({ lat: 42.6334, lng: -71.3162 }), []);
  // let markers = props.markers;
  // if (!markers) {
  //   markers = [
  //     { lat: 48.8584, lng: 2.2945, id: 'marker1', type: "Pothole" },
  //     { lat: 48.8500, lng: 2.3000, id: 'marker2' },

  //   ];
  // }
  //const { mapData } = getContext(MapDataContext);
  console.log("MARKERS GOTTEN: ", mapData);
  console.log(Array.isArray(mapData));
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDE0Qmrx_Qn5Nx04wvENvJ_riRGll6-tx0",
  });
  if (!isLoaded) return <div>Loading...</div>;

  const MapStyle = {
    width: "100%",
    height: "100vh",
  };

  const backgroundMap = {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: "0px",
    left: "0px",
    zIndex: "0",
  };

  return (
    <div style={backgroundMap}>
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerStyle={MapStyle}
        options={{
          mapTypeControl: false,
          fullscreenControlOption: true,
          fullscreenControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
          },
        }}
      >
        {Array.isArray(mapData) &&
          mapData.map((marker) => {
            // console.log("Marker ID: ", marker.id); // This is the console log for marker id
            //console.log("Marker lat: ", marker.lat);
            //console.log(marker.title);
            return (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  setSelectedLocation(marker);
                }}
              />
            );
          })}
        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => {
              setSelectedLocation(null);
            }}
          >
            <div>
              <p>
                {selectedLocation.title}
                <br />
                Type: {selectedLocation.type}
                <br />
                Location: {selectedLocation.lat.toFixed(3)},{" "}
                {selectedLocation.lng.toFixed(3)},{" "}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};
export default Map;
