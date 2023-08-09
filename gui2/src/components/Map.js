// Map.js
import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindowF,
} from "@react-google-maps/api";
import MapContext from "../contexts/MapContext";

const Map = () => {
  const { mapData, setMapData, center, setCenter } = useContext(MapContext);

  console.log("MARKERS GOTTEN: ", mapData);
  console.log(Array.isArray(mapData));
  const {
    selectedLocation,
    setSelectedLocation,
    isCloseClicked,
    setIsCloseClicked,
    details,
    setDetails,
    showDetails,
    setShowDetails,
  } = useContext(MapContext);

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
            return (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  setSelectedLocation(marker);
                  console.log("Marker clicked:" + marker.id);
                  setDetails(marker.id);
                  setShowDetails(true);
                }}
              />
            );
          })}
        {selectedLocation && (
          <InfoWindowF
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => {
              setSelectedLocation(null);
              setShowDetails(false);
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
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
};
export default Map;
