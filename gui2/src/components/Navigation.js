import React from "react";
import filterImg from "../images/Filter Tab.svg";
import viewEvents from "../images/Community Tab.svg";
import viewReports from "../images/View Reports.svg";
import createAlerts from "../images/Create Alert Tab.svg";
import bookmarks from "../images/BookMarks Tab.svg";
import profile from "../images/Profile Tab.svg";
import "../style/Navigation.css";
const Navigation = () => {
  return (
    <div className="navigationMenu col-12 offset-lg-3 col-lg-6">
      <img src={filterImg} className="filterImg col-2 col-lg-2" />
      <img src={viewEvents} className="viewEvents col-2 col-lg-2" />
      <img src={viewReports} className=" col-2 col-lg-2" />
      <img src={createAlerts} className="col-2 col-lg-2" />
      <img src={bookmarks} className="bookmarks col-2 col-lg-2" />
      <img src={profile} className="profile col-2 col-lg-2" />
    </div>
  );
};

export default Navigation;
