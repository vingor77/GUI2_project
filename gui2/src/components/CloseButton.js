import React from "react";
import closeButton from "../images/closeButton.svg";
const CloseButton = ({ setTab }) => {
  const buttonStyle = {
    paddingTop: "5px",
    width: "auto",
    marginLeft: "20px",
  };

  return (
    <img
      onClick={() => setTab(false)}
      src={closeButton}
      style={buttonStyle}
      alt="close button"
    />
  );
};

export default CloseButton;
