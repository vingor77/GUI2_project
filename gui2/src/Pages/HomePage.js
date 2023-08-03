//HomePage.js
import React, { useContext, useEffect } from "react";
import DataContext from '../contexts/DataContext';
import Navigation from "../components/Navigation";
// import { SignOutButton } from "../components/SignOutButton";
import Map from "../components/Map";
import TopMenu from "../components/TopMenu";
import MapContext from '../contexts/MapContext';

const HomePage = ({ user }) => {
  const data = useContext(DataContext);
  const { mapData, setMapData } = useContext(MapContext);
  useEffect(() => {
  const newMarkers = data
.filter(item => item && item.Location && item.Location.latitude && item.Location.longitude)
.map((item, index) => ({
  lat: item.Location.latitude, 
  lng: item.Location.longitude, 
  id: `marker${index}`
  //type: item.Type
}));
console.log("user: " +JSON.stringify(user));
if (JSON.stringify(mapData) !== JSON.stringify(newMarkers)) {
  setMapData(newMarkers);
}  }, [data, setMapData]); //TODO: make this ID dependent
  return (
    <>
      {/* <SignOutButton user={user} /> */}
      <TopMenu user={user} />
      <Navigation user={user}/>
      <Map mapData={mapData} setMapData={setMapData}/>
    </>
  );
};

export default HomePage;
