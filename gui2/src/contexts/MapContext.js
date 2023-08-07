// contexts/MapContext.js
import React, { createContext, useState } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [mapData, setMapData] = useState([]);
  const [center, setCenter] = useState({ lat: 42.6334, lng: -71.3162 });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isCloseClicked, setIsCloseClicked] = useState(false);
  return (
    <MapContext.Provider
      value={{
        mapData,
        setMapData,
        isCloseClicked,
        setIsCloseClicked,
        center,
        setCenter,
        selectedLocation,
        setSelectedLocation,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;
