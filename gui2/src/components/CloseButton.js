// CloseButton.js
import closeButton from "../images/closeButton.svg";
import React, { useContext, useEffect } from "react";
import DataContext from "../contexts/DataContext";
import MapContext from "../contexts/MapContext";
const CloseButton = ({ setTab }) => {
  const buttonStyle = {
    marginBottom: "10px",
    width: "auto",
    marginLeft: "20px",
  };
  const { setIsCloseClicked } = useContext(MapContext);

  return (
    <img
      onClick={() => {
        setTab(false);
        setIsCloseClicked(true);
      }}
      src={closeButton}
      style={buttonStyle}
      alt="close button"
    />
  );
};

export default CloseButton;
