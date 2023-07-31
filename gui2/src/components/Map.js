import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDE0Qmrx_Qn5Nx04wvENvJ_riRGll6-tx0",
  });
  if (!isLoaded) return <div>Loading...</div>;

  const MapStyle = {
    width: "100%",
    height: "100vh",
  };

  function LoadMap() {
    return (
      <GoogleMap
        zoom={15}
        center={{ lat: 48.8584, lng: 2.2945 }}
        mapContainerStyle={MapStyle}
        options={{
          mapTypeControl: false,
          fullscreenControlOption: true,
          fullscreenControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
          },
        }}
      ></GoogleMap>
    );
  }

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
      <LoadMap />
    </div>
  );
};

export default Map;
