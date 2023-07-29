import React from "react";
import searchIcon from "../images/Search icon.svg";
const TopMenu = () => {
  const topMenuStyle = {
    borderStyle: "solid",
    marginLeft: "5px",
  };
  const searchIconStyle = {
    width: "40px",
    height: "auto",
  };
  return (
    <div style={topMenuStyle} className="row col-lg-3">
      <img style={searchIconStyle} className="col-lg-2" src={searchIcon} />

      {/* Temp Searchbox, might be using javascript api */}
      <input
        style={{ borderStyle: "none" }}
        className="col-lg-6"
        type="text"
        placeholder="Search.."
      />
    </div>
  );
};

export default TopMenu;
