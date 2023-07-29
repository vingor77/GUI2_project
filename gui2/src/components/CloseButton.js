import React from "react";
import closeButton from "../images/closeButton.svg";
import { Link } from "react-router-dom";
const CloseButton = () => {
  const buttonStyle = {
    paddingTop: "5px",
    width: "auto",
    marginLeft: "20px",
  };

  return (
    <Link to="/" style={buttonStyle}>
      <img src={closeButton} />
    </Link>
  );
};

export default CloseButton;
