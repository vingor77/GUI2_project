import React from "react";
import searchIcon from "../images/Search icon.svg";
import sliderMenu from "../images/SliderMenu.svg";
import { useState } from "react";
const TopMenu = () => {
  const topMenuStyle = {
    borderStyle: "solid",
    marginLeft: "0px",
    marginTop: "10px",
    paddingBottom: "10px",
    background: "#D9D9D9",
    zIndex: "1",
  };
  const searchIconStyle = {
    paddingTop: "10px",
    background: "#D9D9D9",
  };
  const searchBoxStyle = {
    borderStyle: "none",
    background: "#D9D9D9",
    paddingTop: "10px",
    outline: "none",
  };
  const sliderMenuStyle = {
    background: "#D9D9D9",
    paddingTop: "10px",
  };
  const optionStyle = {
    paddingTop: "10px",
    background: "#D9D9D9",
    textAlign: "center",
  };

  // Display about us and help option
  const [showOptions, setShowOptions] = useState(false);
  const onClick = () => setShowOptions(!showOptions);
  const Option = () => (
    <div className="row col-lg-3 col-5" style={topMenuStyle}>
      <h5 style={optionStyle} className="offset-lg-1 col-lg-5 col-6">
        About Us
      </h5>
      <h5 style={optionStyle} className="col-lg-5 col-6">
        Help
      </h5>
    </div>
  );

  return (
    <div className="row" style={{ marginLeft: "5px" }}>
      <div style={topMenuStyle} className="row col-lg-3 col-6">
        {/* Search icon */}
        <img
          style={searchIconStyle}
          className=" col-3 col-lg-2"
          src={searchIcon}
        />

        {/* Temp searchbox, might be using javascript api */}
        <input
          style={searchBoxStyle}
          className="col-6 col-lg-7"
          type="text"
          placeholder="Search"
        />

        {/* Slider menu */}
        <img
          onClick={onClick}
          className="col-3 col-lg-2"
          style={sliderMenuStyle}
          src={sliderMenu}
        />
      </div>
      {showOptions ? <Option /> : null}
    </div>
  );
};

export default TopMenu;
