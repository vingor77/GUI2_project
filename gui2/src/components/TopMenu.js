import React from "react";
import searchIcon from "../images/Search icon.svg";
import sliderMenu from "../images/SliderMenu.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SignOutButton } from "./SignOutButton";
const TopMenu = ({ user }) => {
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

  const moveMap = () => {
    alert(locationInput);
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
          placeholder="Search"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />

        {/* Slider menu */}
        <img
          onClick={onClick}
          className="col-4 col-md- col-lg-2 col-sm-3"
          style={sliderMenuStyle}
          src={sliderMenu}
          alt="drop down menu"
        />
      </div>
      {showOptions ? <Option /> : null}
      {/* <div className="offset-lg-5 col-lg-1"> */}
      <SignOutButton user={user} />
      {/* </div> */}
    </div>
  );
};

export default TopMenu;
