// contexts/MapContext.js
import React, { createContext, useState } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [mapData, setMapData] = useState([]);

  return (
    <MapContext.Provider value={{ mapData, setMapData }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;
