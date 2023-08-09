import React from "react";
import viewEvents from "../images/Community Tab.svg";
import viewReports from "../images/View Reports.svg";
import createAlerts from "../images/Create Alert Tab.svg";
import bookmarks from "../images/BookMarks Tab.svg";
import Tab from "./Tab";
import { useState } from "react";
import "../style/Hover.css";
const Navigation = ({ user }) => {
  const navigationMenuStyle = {
    position: "absolute",
    bottom: "0",
    borderStyle: "solid",
    zIndex: "1",
    background: "#CAFFB9",
    borderRadius: "10px",
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
      <div
        style={navigationMenuStyle}
        className=" col-12 offset-xl-4 col-xl-4 offset-lg-3 col-lg-6 offset-md-3 col-md-6 offset-sm-2 col-sm-8"
      >
        <img
          onClick={() => onClick("View Events")}
          src={viewEvents}
          className="viewEvents col-3 col-lg-3 col-md-3"
          alt="View Events Button"
          style={{ cursor: "pointer" }}
        />

        <img
          onClick={() => onClick("View Issues")}
          src={viewReports}
          className=" col-3 col-lg-3 col-md-3"
          alt="View Reports Button"
          style={{ cursor: "pointer" }}
        />

        <img
          onClick={() => onClick("Create Alert")}
          src={createAlerts}
          className="col-3 col-lg-3 col-md-3"
          alt="CreateAlerts Button"
          style={{ cursor: "pointer" }}
        />

        <img
          onClick={() => onClick("Bookmarks")}
          src={bookmarks}
          className="bookmarks col-3 col-lg-3 col-md-3"
          alt="Bookmarks Button"
          style={{ cursor: "pointer" }}
        />
      </div>
      {/* Display tab if the state is true */}
      {showTab ? <Display displayName={name} setShowTab={setShowTab} /> : null}
    </>
  );
};

export default React.memo(Navigation);
