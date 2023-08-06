// contexts/MapContext.js
import React, { createContext, useState } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [mapData, setMapData] = useState([]);
  const [isCloseClicked, setIsCloseClicked] = useState(false);
  return (
    <MapContext.Provider
      value={{ mapData, setMapData, isCloseClicked, setIsCloseClicked }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;
