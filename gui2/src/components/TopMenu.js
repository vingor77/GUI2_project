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
    paddingTop: "10px",
  };
  const optionStyle = {
    paddingTop: "10px",
    background: "#D0F5FF",
    textAlign: "center",
  };

  // Display about us and help option
  const [showOptions, setShowOptions] = useState(false);
  const onClick = () => setShowOptions(!showOptions);
  const Option = () => (
    <div className="row col-lg-3 col-7" style={topMenuStyle}>
      <Link
        style={optionStyle}
        to="about"
        className="offset-lg-1 col-lg-5 col-6"
      >
        <h5>About Us</h5>
      </Link>
      <Link style={optionStyle} to="help" className="col-lg-5 col-6">
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
          className=" col-3 col-md-3 col-lg-2"
          src={searchIcon}
          alt="search icon"
        />

        {/* Temp searchbox, might be using javascript api */}
        <input
          style={searchBoxStyle}
          className="col-5 col-md-5 col-lg-7"
          type="text"
          placeholder="Search"
        />

        {/* Slider menu */}
        <img
          onClick={onClick}
          className="col-3 col-md-3 col-lg-2"
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
