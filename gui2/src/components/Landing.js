import React from "react";
import "../style/Landing.css";
import leftImage from "../images/leftImage.svg";

const Landing = () => {
  const greeting = "Welcome To \n CommunityAlert!";
  return (
    <div className="title row">
      <img
        className="col-lg-3 col-3 leftImg"
        src={leftImage}
        alt="greeting background"
      />
      <h1 className="col-lg-6 col-6 greeting ">{greeting}</h1>
      <img
        className="col-lg-3 col-3 rightImg"
        src={leftImage}
        alt="greeting background"
      />
    </div>
  );
};

export default Landing;
