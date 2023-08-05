//HomePage.js
import React, { useContext, useEffect } from "react";
import DataContext from '../contexts/DataContext';
import Navigation from "../components/Navigation";
// import { SignOutButton } from "../components/SignOutButton";
import Map from "../components/Map";
import TopMenu from "../components/TopMenu";
import MapContext from '../contexts/MapContext';

const HomePage = ({ user }) => {
  //alert();
  const data = useContext(DataContext);
  const { mapData, setMapData, isCloseClicked, setIsCloseClicked } = useContext(MapContext);
  useEffect(() => {
  const newMarkers = data
.filter(item => item && item.Location && item.Location.latitude && item.Location.longitude)
.map((item, index) => ({
  lat: item.Location.latitude,
  lng: item.Location.longitude,
  id: `marker${index}`,
  type: item.AlertType,
  title: item.Title,
})); //console.log(JSON.stringify(user))
console.log("hp: "+ JSON.stringify(mapData) + " ... " + JSON.stringify(newMarkers));
if (JSON.stringify(mapData) !== JSON.stringify(newMarkers)) {
  setMapData(newMarkers);
}   if (isCloseClicked) {
  setIsCloseClicked(false);
}
}, [data, setMapData, isCloseClicked]); 
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
