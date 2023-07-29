import React from "react";
import filterImg from "../images/Filter Tab.svg";
import viewEvents from "../images/Community Tab.svg";
import viewReports from "../images/View Reports.svg";
import createAlerts from "../images/Create Alert Tab.svg";
import bookmarks from "../images/BookMarks Tab.svg";
import profile from "../images/Profile Tab.svg";
import { Link } from "react-router-dom";

const Navigation = () => {
  const navigationMenuStyle = {
    position: "absolute",
    bottom: "0",
    borderStyle: "solid",
  };
  return (
    <div
      style={navigationMenuStyle}
      className="navigationMenu col-12 offset-lg-3 col-lg-6"
    >
      <Link to="/filter">
        <img
          src={filterImg}
          className="filterImg col-2 col-lg-2"
          alt="Filter Button"
        />
      </Link>

      <Link to="/events">
        <img
          src={viewEvents}
          className="viewEvents col-2 col-lg-2"
          alt="View Events Button"
        />
      </Link>

      <Link to="/reports">
        <img
          src={viewReports}
          className=" col-2 col-lg-2"
          alt="View Reports Button"
        />
      </Link>

      <Link to="/createAlerts">
        <img
          src={createAlerts}
          className="col-2 col-lg-2"
          alt="CreateA lerts Button"
        />
      </Link>

      <Link to="/bookmarks">
        <img
          src={bookmarks}
          className="bookmarks col-2 col-lg-2"
          alt="Bookmarks Button"
        />
      </Link>

      <Link to="/profile">
        <img
          src={profile}
          className="profile col-2 col-lg-2"
          alt="Profile Button"
        />
      </Link>
    </div>
  );
};

export default Navigation;
