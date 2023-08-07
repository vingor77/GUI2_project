import React from "react";
import searchIcon from "../images/Search icon.svg";
import sliderMenu from "../images/SliderMenu.svg";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { SignOutButton } from "./SignOutButton";
import MapContext from "../contexts/MapContext";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
//import Tooltip from "./Tooltip";
const TopMenu = ({ user }) => {
  const [geocoder, setGeocoder] = useState(null);
  const [locationFound, setLocationFound] = useState(true);
  const topMenuStyle = {
    borderStyle: "solid",
    marginLeft: "0px",
    marginTop: "10px",
    paddingBottom: "10px",
    background: "#D0F5FF",
    zIndex: "1",
  };
  const searchIconStyle = {
    paddingTop: "10px",
    background: "#D0F5FF",
  };
  const searchBoxStyle = {
    borderStyle: "none",
    background: "#D0F5FF",
    paddingTop: "10px",
    outline: "none",
    fontSize: "1.2em",
  };
  const sliderMenuStyle = {
    background: "#D0F5FF",
    borderStyle: "solid",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
  };
  const optionStyle = {
    paddingTop: "20px",
    background: "#D0F5FF",
    textAlign: "center",
    color: "#3F4A3C",
    textDecoration: "none",
    height: "auto",
  };

  // Display about us and help option
  const [showOptions, setShowOptions] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const { mapData, setMapData, center, setCenter } = useContext(MapContext);

  //const [searchType, setSearchType] = useState("Map Area");
  const moveMap = () => {
    //alert(locationInput);
    if (locationInput) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${locationInput}&key=AIzaSyDE0Qmrx_Qn5Nx04wvENvJ_riRGll6-tx0`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            setCenter(data.results[0].geometry.location);
            setLocationFound(true);
          } else {
            setLocationFound(false);
          }
        })
        .catch((error) => {
          setLocationFound(false);
        });
    } else {
      setLocationFound(false);
    }
  };
  const onClick = () => setShowOptions(!showOptions);
  const Option = () => (
    <div className="row col-lg-3 col-7" style={topMenuStyle}>
      <Link
        style={optionStyle}
        to="about"
        className="offset-lg-1 col-lg-5 col-6 col-xl-5"
      >
        <h5>About Us</h5>
      </Link>
      <Link
        style={optionStyle}
        to="help"
        className="align-middle col-lg-5 col-6 col-xl-5"
      >
        <h5>Help</h5>
      </Link>
    </div>
  );

  return (
    <div className="row" style={{ marginLeft: "5px" }}>
      <div style={topMenuStyle} className="row col-lg-3 col-md-3 col-6">
        {/* <select
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value);
          }}
        >
          <option value="Map Area">Search Map Area</option>
          <option value="List Items">Search List Items</option>
        </select> */}
        {/* Search icon */}
        <img
          style={searchIconStyle}
          className=" col-4 col-md-2 col-lg-2 col-sm-3"
          src={searchIcon}
          alt="search icon"
          onClick={moveMap}
        />

        {/* Temp searchbox, might be using javascript api */}
        <input
          style={searchBoxStyle}
          className="col-4 col-md-5 col-lg-7 "
          type="text"
          placeholder="Enter an area to view"
          title="ex: 'Boston, MA'"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              moveMap();
            }
          }}
        />

        {/* Slider menu */}
        <img
          onClick={onClick}
          className="col-4 col-md- col-lg-2 col-sm-3"
          style={sliderMenuStyle}
          src={sliderMenu}
          alt="drop down menu"
          title="Click to see Help and About Us page"
        />
      </div>
      {!locationFound && (
        <div
          style={{
            zIndex: "9",
            color: "red",
            fontWeight: "bolder",
            marginLeft: "15px",
            marginTop: "-28px",
          }}
        >
          Not found, usage: "Boston, MA"
        </div>
      )}
      {showOptions ? <Option /> : null}
      {/* <div className="offset-lg-5 col-lg-1"> */}
      <SignOutButton user={user} />
      {/* </div> */}
    </div>
  );
};

export default TopMenu;
