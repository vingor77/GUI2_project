import React from "react";
import "../style/Landing.css";
import leftImage from "../images/leftImage.svg";

const Landing = () => {
  const greeting = "Welcome To \n CommunityAlert!";
  const terms = "CommunityAlert is a platform that was designed with the intention to promote safety and unity within local communities.\n";

  return (
    <div className="title row">
      <img
        className="col-lg-3  d-none d-lg-block d-xl-block "
        src={leftImage}
        alt="greeting background"
      />
      <div className="col-lg-6 col-12 greeting">
        <h1>{greeting}</h1>
        <p>{terms}</p>
      </div>
      <img
        className="col-lg-3  d-none d-lg-block d-xl-block"
        src={leftImage}
        alt="greeting background"
      />
    </div>
  );
};

export default Landing;
