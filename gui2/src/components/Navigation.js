import React from "react";
import filterImg from "../images/Filter Tab.svg";
import viewEvents from "../images/Community Tab.svg";
import viewReports from "../images/View Reports.svg";
import createAlerts from "../images/Create Alert Tab.svg";
import bookmarks from "../images/BookMarks Tab.svg";
import profile from "../images/Profile Tab.svg";
import Tab from "./Tab";
import { useState } from "react";
const Navigation = ({ user }) => {
  const navigationMenuStyle = {
    position: "absolute",
    bottom: "0",
    borderStyle: "solid",
    zIndex: "1",
    background: "#CAFFB9",
  };

  const [showTab, setShowTab] = useState(false);
  const [name, setName] = useState("");
  function onClick(title) {
    setShowTab(true);
    setName(title);
  }
  const Display = ({ displayName, setShowTab }) => (
    <Tab tabTitle={displayName} set={setShowTab} user={user} />
  );

  return (
    <>
      <div style={navigationMenuStyle} className=" col-12 offset-lg-3 col-lg-6">
        <img
          onClick={() => onClick("Filter")}
          src={filterImg}
          className="filterImg col-2 col-lg-2"
          alt="Filter Button"
          style={{ cursor: "pointer" }}
        />
        <img
          onClick={() => onClick("View Events")}
          src={viewEvents}
          className="viewEvents col-2 col-lg-2"
          alt="View Events Button"
          style={{ cursor: "pointer" }}
        />

        <img
          onClick={() => onClick("View Reports")}
          src={viewReports}
          className=" col-2 col-lg-2"
          alt="View Reports Button"
          style={{ cursor: "pointer" }}
        />

        <img
          onClick={() => onClick("Create Alert")}
          src={createAlerts}
          className="col-2 col-lg-2"
          alt="CreateAlerts Button"
          style={{ cursor: "pointer" }}
        />

        <img
          onClick={() => onClick("Bookmarks")}
          src={bookmarks}
          className="bookmarks col-2 col-lg-2"
          alt="Bookmarks Button"
          style={{ cursor: "pointer" }}
        />

        <img
          onClick={() => onClick("Profile")}
          src={profile}
          className="profile col-2 col-lg-2"
          alt="Profile Button"
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Display tab if the state is true */}
      {showTab ? <Display displayName={name} setShowTab={setShowTab} /> : null}
    </>
  );
};

export default Navigation;
